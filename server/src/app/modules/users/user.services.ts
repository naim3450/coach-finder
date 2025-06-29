import { StatusCodes } from "http-status-codes";
import { IServiceResponse } from "../../interfaces/service-response";
import { IUser } from "./user.interfaces";
import User from "./user.models";
import { userRoles } from "../../constants";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "qgenie";
import { ObjectId } from "mongodb";
import AppError from "../../errors/app-error";
import transporter from "../../emails/transporter";
import { createAccVerificationEmailTemplate } from "../../emails/create-acc-verification-template";
import getGreetingBasedOnTime from "../../../utils/generate-greeting";

async function retrieveAllUsersFromDb(
  query: Record<string, unknown>
): Promise<IServiceResponse> {
  const queryBuilder = new QueryBuilder(User.find(), query);

  const result = await queryBuilder
    .search(["first_name", "last_name"])
    .filter()
    .sort()
    .paginate()
    .executeWithMetadata();

  return {
    success: true,
    status: 200,
    message: "Users retrieved successfully",
    data: result,
  };
}

async function retrieveSingleUserFromDb(
  userId: string
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(userId)) {
    throw new AppError(400, "Invalid user id");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found with that id");
  }

  return {
    success: true,
    status: 200,
    message: "user retrieved successfully",
    data: user,
  };
}

// Create user into database
async function createUserIntoDb(payload: IUser): Promise<IServiceResponse> {
  // Check if role is admin
  if (payload.role && payload.role === userRoles.ADMIN) {
    return {
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Invalid role",
      data: null,
    };
  }

  // Check if user already exists
  const userExists = await User.findOne({ email: payload.email });

  if (userExists) {
    return {
      status: StatusCodes.CONFLICT,
      success: false,
      message: "User already exists",
      data: null,
    };
  }

  // Create user
  const result = await User.create(payload);

  if (result.role === userRoles.CONTRIBUTOR) {
    const now = new Date();
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    result.verification_code = verificationCode;
    result.expire_at = new Date(now.getTime() + 30 * 60 * 1000);
    await result.save();

    await transporter.sendMail({
      to: result.email,
      subject: "Verify Your Coach Finder Account",
      html: createAccVerificationEmailTemplate({
        greeting: getGreetingBasedOnTime(),
        verificationCode,
      }),
    });
  }

  return {
    status: StatusCodes.CREATED,
    success: true,
    message: "User successfully registered",
    data: result,
  };
}

// update user

async function updateUserIntoDb(
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<IServiceResponse> {
  const sanitizedPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([key]) => !["account_type", "is_verified", "role"].includes(key)
    )
  );

  const result = await User.findOneAndUpdate(
    { _id: user._id },
    sanitizedPayload,
    { new: true }
  );

  if (!result) {
    return {
      success: false,
      status: StatusCodes.BAD_REQUEST,
      message: "Something bad happened!",
      data: null,
    };
  }

  return {
    success: true,
    status: StatusCodes.OK,
    message: "User info successfully updated",
    data: result,
  };
}

export const UserServices = {
  createUserIntoDb,
  updateUserIntoDb,
  retrieveAllUsersFromDb,
  retrieveSingleUserFromDb,
};
