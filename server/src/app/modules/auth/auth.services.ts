import { StatusCodes } from "http-status-codes";
import { IServiceResponse } from "../../interfaces/service-response";
import User from "../users/user.models";
import { generateAuthToken } from "../../../utils/generate-auth-token";
import { IAuthCredential, IChangePassword } from "./auth.interfaces";
import { JwtPayload } from "jsonwebtoken";
import transporter from "../../emails/transporter";
import forgotPasswordEmailTemplate from "../../emails/forgot-password-template";
import AppError from "../../errors/app-error";

async function getAuthUserFromDb(user: JwtPayload): Promise<IServiceResponse> {
  const result = await User.findById(user._id);

  return {
    success: true,
    status: StatusCodes.OK,
    message: "auth user successfully retrieved",
    data: result,
  };
}

async function verifyAccountIntoDb(payload: {
  email: string;
  verificationCode: number;
}): Promise<IServiceResponse> {
  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new AppError(404, "User not found with that email");
  }

  if (!user.expire_at || !user.verification_code) {
    throw new AppError(
      400,
      "required key(s) missing or session is already closed"
    );
  }

  if (user.verification_code !== payload.verificationCode) {
    throw new AppError(400, "Invalid verification code");
  }

  if (user.expire_at < new Date()) {
    throw new AppError(400, "Verification code expired");
  }

  user.email_verified = true;
  user.verification_code = undefined;
  user.expire_at = undefined;
  await user.save();

  return {
    success: true,
    status: 200,
    message: "Email successfully verified",
    data: user,
  };
}

async function loginUserFromDb(
  credentials: IAuthCredential
): Promise<IServiceResponse> {
  // Check if user exists
  const user = await User.findOne({ email: credentials.email });

  if (!user) {
    return {
      status: StatusCodes.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
    };
  }

  // Check if password is correct
  const isPasswordCorrect = await user.comparePassword(credentials.password);

  if (!isPasswordCorrect) {
    return {
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Wrong password",
      data: null,
    };
  }

  const token = generateAuthToken(
    {
      _id: String(user._id),
      role: user.role,
      account_type: user.account_type,
      email: user.email,
      gender: user?.gender,
    },
    "15d"
  );

  return {
    status: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      user,
    },
  };
}

async function changePasswordIntoDb(
  user: JwtPayload,
  payload: IChangePassword
): Promise<IServiceResponse> {
  const userObj = await User.findById(user._id);

  if (!userObj) {
    return {
      status: StatusCodes.NOT_FOUND,
      success: false,
      message: "user not found",
      data: null,
    };
  }

  // Check if password is correct
  const isPasswordCorrect = await userObj.comparePassword(payload.oldPassword);

  if (!isPasswordCorrect) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Wrong password",
      data: null,
    };
  }

  userObj.password = payload.newPassword;
  await userObj.save();

  return {
    status: StatusCodes.OK,
    success: true,
    message: "Password changed successfully",
    data: userObj,
  };
}

async function forgotPasswordIntoDb(payload: {
  email: string;
}): Promise<IServiceResponse> {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return {
      status: StatusCodes.NOT_FOUND,
      success: false,
      message: "User not found with that email",
      data: null,
    };
  }
  const now = new Date();
  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  user.verification_code = verificationCode;
  user.expire_at = new Date(now.getTime() + 30 * 60 * 1000);
  await user.save();

  // send email
  const sendEmail = await transporter.sendMail({
    to: user.email,
    subject: "Reset Your Coach Finder Password",
    html: forgotPasswordEmailTemplate({
      name: `${user.first_name} ${user.last_name}`,
      confirmationCode: verificationCode,
    }),
  });

  if (!sendEmail.accepted.length) {
    return {
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to send Email",
      data: null,
    };
  }

  return {
    status: StatusCodes.OK,
    success: true,
    message: "Verification Email Send. Check inbox with spam/junk",
    data: null,
  };
}
async function resetPasswordIntoDb(payload: {
  email: string;
  verificationCode: number;
  newPassword: string;
}): Promise<IServiceResponse> {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(404, "User not found with that id");
  }

  if (!user.verification_code || !user.expire_at) {
    throw new AppError(
      400,
      "required key(s) missing or session is already closed"
    );
  }

  if (user.verification_code !== payload.verificationCode) {
    throw new AppError(400, "Invalid verification code");
  }

  if (user.expire_at < new Date()) {
    throw new AppError(400, "Verification code expired");
  }

  user.password = payload.newPassword;
  user.expire_at = undefined;
  user.verification_code = undefined;
  user.save();

  return {
    success: true,
    status: StatusCodes.OK,
    message: "Password reset successful",
    data: user,
  };
}

export const AuthServices = {
  loginUserFromDb,
  changePasswordIntoDb,
  forgotPasswordIntoDb,
  resetPasswordIntoDb,
  getAuthUserFromDb,
  verifyAccountIntoDb,
};
