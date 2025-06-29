import { JwtPayload } from "jsonwebtoken";
import { IServiceResponse } from "../../../interfaces/service-response";
import { ObjectId } from "mongodb";
import AppError from "../../../errors/app-error";
import Review from "../review.model";
import Group from "../../groups/group.models";
import Response from "./response.model";
import { QueryBuilder } from "qgenie";

export const userRoles = {
  ADMIN: "admin",
  CONTRIBUTOR: "contributor",
  CUSTOMER: "customer",
};

async function getResponsesFromDb(
  query: Record<string, any>
): Promise<IServiceResponse> {
  const queryBuilder = new QueryBuilder(Response.find(), query);
  const result = await queryBuilder
    .filter()
    .sort()
    .populate([
      {
        path: "user",
        select: ["first_name", "last_name", "email", "profile_picture"],
      },
    ])
    .exec();

  return {
    success: true,
    status: 200,
    message: "Responses successfully retrieved",
    data: result,
  };
}

async function createReviewResponseIntoDb(
  user: JwtPayload,
  reviewId: string,
  payload: {
    description: string;
  }
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(reviewId)) {
    throw new AppError(400, "Invalid review Id");
  }

  const review = await Review.findOne({
    _id: reviewId,
  });

  if (!review) {
    throw new AppError(404, "Review not found with that id");
  }

  const group = await Group.findOne({
    _id: review.group,
    isDeleted: false,
  });

  if (!group) {
    throw new AppError(404, "Group not found");
  }

  if (String(group.user) !== user._id && user.role !== userRoles.ADMIN) {
    throw new AppError(401, "You have no access to perform this action");
  }

  const result = await Response.create({
    user: user._id,
    review: reviewId,
    description: payload.description,
  });

  return {
    success: true,
    status: 201,
    message: "response successfully send",
    data: result,
  };
}

async function updateResponseIntoDb(
  user: JwtPayload,
  responseId: string,
  payload: { description: string }
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(responseId)) {
    throw new AppError(400, "Invalid Response Id");
  }
  const response = await Response.findById(responseId);

  if (!response) {
    throw new AppError(404, "Response not found with that id");
  }

  if (String(response.user) !== user._id && user.role !== userRoles.ADMIN) {
    throw new AppError(401, "You have no access to preform this action");
  }

  const result = await Response.findByIdAndUpdate(responseId, payload, {
    new: true,
  });

  return {
    success: true,
    status: 200,
    message: "Response successfully updated",
    data: result,
  };
}

async function deleteResponseFromDb(
  user: JwtPayload,
  responseId: string
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(responseId)) {
    throw new AppError(400, "Invalid Response Id");
  }
  const response = await Response.findById(responseId);

  if (!response) {
    throw new AppError(404, "Response not found with that id");
  }

  if (String(response.user) !== user._id && user.role !== userRoles.ADMIN) {
    throw new AppError(401, "You have no access to preform this action");
  }

  const result = await Response.findByIdAndDelete(responseId);

  return {
    success: true,
    status: 200,
    message: "Response successfully deleted",
    data: result,
  };
}

export const ResponseServices = {
  createReviewResponseIntoDb,
  updateResponseIntoDb,
  deleteResponseFromDb,
  getResponsesFromDb,
};
