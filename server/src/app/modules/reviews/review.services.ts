import { JwtPayload } from "jsonwebtoken";
import { IServiceResponse } from "../../interfaces/service-response";
import { IReview } from "./review.interfaces";
import Group from "../groups/group.models";
import { StatusCodes } from "http-status-codes";
import Review from "./review.model";
import AppError from "../../errors/app-error";
import { isValidObjectId } from "mongoose";
import { userRoles } from "../../constants";
import { QueryBuilder } from "qgenie";
import { ObjectId } from "mongodb";

async function retrieveReviewsFromDb(
  query: Record<string, any>
): Promise<IServiceResponse> {
  // Base query for Review.find()
  let baseQuery = Review.find();

  // // Modify query based on user role
  // if (user.role === userRoles.CUSTOMER) {
  //   // Filter by customer ID
  //   baseQuery = baseQuery.where("user").equals(user._id);
  // } else if (user.role === userRoles.CONTRIBUTOR) {
  //   // Filter by groups where the contributor is associated
  //   const groups = await Group.find({ user: user._id }).select("_id"); // Fetch groups linked to the contributor
  //   const groupIds = groups.map((group) => group._id); // Extract group IDs
  //   baseQuery = baseQuery.where("group").in(groupIds); // Filter reviews by these group IDs
  // }

  // Use QueryBuilder with constructed baseQuery
  const { isPending: _, ...queryWithoutIsPending } = query;
  const queryBuilder = new QueryBuilder(baseQuery, {
    ...queryWithoutIsPending,
    isPending:
      query.isPending === "true"
        ? true
        : query.isPending === "false"
        ? false
        : false,
  });

  // Process query with filter, sort, pagination, and population
  const result = await queryBuilder
    .filter()
    .sort()
    .paginate()
    .populate([
      {
        path: "user",
        select: ["first_name", "last_name", "email", "profile_picture"],
      },
      { path: "group" },
    ])
    .executeWithMetadata();

  // Return success response
  return {
    success: true,
    status: StatusCodes.OK,
    message: "Reviews successfully retrieved",
    data: result,
  };
}

async function retrieveSingleReviewsFromDb(
  reviewId: string
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(reviewId)) {
    throw new AppError(400, "Invalid review id format");
  }

  const result = await Review.findOne({
    _id: reviewId,
    isPending: false,
  });

  if (!result) {
    throw new AppError(404, "Review not found with that id");
  }

  return {
    success: true,
    status: 200,
    message: "Single review successfully fetched",
    data: result,
  };
}

async function createNewReviewIntoDb(
  user: JwtPayload,
  payload: IReview
): Promise<IServiceResponse> {
  const group = await Group.findOne({
    _id: payload.group,
    isDeleted: false,
  }).lean();

  if (!group) {
    throw new AppError(StatusCodes.NOT_FOUND, "Group not found");
  }
  const { user: _, ...dataWithoutUser } = payload;
  const result = await Review.create({ user: user._id, ...dataWithoutUser });

  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server error"
    );
  }

  return {
    success: true,
    status: StatusCodes.CREATED,
    message: "Review successfully created",
    data: result,
  };
}

async function updateReviewIntoDb(
  user: JwtPayload,
  _id: string,
  payload: Partial<IReview>
): Promise<IServiceResponse> {
  if (!isValidObjectId(_id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid reviewId format");
  }

  if (payload.hasOwnProperty("group")) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "You cannot change groupId");
  }

  const review = await Review.findById(_id);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, "review not found with that id");
  }

  if (user.role !== userRoles.ADMIN && String(review.user) !== user._id) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to update this review"
    );
  }

  const result = await Review.findByIdAndUpdate(_id, payload, { new: true });

  return {
    success: true,
    status: StatusCodes.OK,
    message: "Group successfully updated",
    data: result,
  };
}

async function approveReviewIntoDb(
  user: JwtPayload,
  reviewId: string
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(reviewId)) {
    throw new AppError(400, "Invalid review id");
  }

  const review = await Review.findOne({
    _id: reviewId,
    isPending: true,
  });

  if (!review) {
    throw new AppError(404, "Review not found with that id");
  }

  const groupContributor = await Group.findById(review.group)
    .select("user")
    .lean();

  if (
    String(groupContributor!.user) !== user._id &&
    user.role !== userRoles.ADMIN
  ) {
    throw new AppError(401, "You have no access to perform this action");
  }

  (review.isPending = false), await review.save();

  return {
    success: true,
    status: 200,
    message: "Review Approved",
    data: review,
  };
}

async function deleteReviewFromDb(
  user: JwtPayload,
  _id: string
): Promise<IServiceResponse> {
  let contributorId;
  if (!isValidObjectId(_id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid reviewId format");
  }

  const review = await Review.findById(_id);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, "review not found with that id");
  }

  if (user.role === userRoles.CONTRIBUTOR) {
    const group = await Group.findById(review.group).select("user").lean();
    contributorId = group?.user;
  }

  if (user.role === userRoles.CUSTOMER && String(review.user) !== user._id) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to delete this review"
    );
  }

  if (
    user.role === userRoles.CONTRIBUTOR &&
    String(contributorId) !== user._id
  ) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to delete this review"
    );
  }

  const result = await Review.findByIdAndDelete(_id);

  return {
    success: true,
    status: StatusCodes.OK,
    message: "Group successfully deleted",
    data: result,
  };
}

export const ReviewServices = {
  createNewReviewIntoDb,
  updateReviewIntoDb,
  deleteReviewFromDb,
  retrieveReviewsFromDb,
  approveReviewIntoDb,
  retrieveSingleReviewsFromDb,
};
