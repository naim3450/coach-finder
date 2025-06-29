import { Request, Response } from "express";
import catchAsync from "../../../utils/catch-async";
import { ReviewServices } from "./review.services";

const retrieveReviews = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await ReviewServices.retrieveReviewsFromDb(req.query);

  res.status(result.status).json(result);
});

const retrieveSingleReviews = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await ReviewServices.retrieveSingleReviewsFromDb(
    req.params.reviewId
  );

  res.status(result.status).json(result);
});

const createNewReview = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await ReviewServices.createNewReviewIntoDb(req.user, req.body);

  res.status(result.status).json(result);
});

const updateReview = catchAsync(async function (req: Request, res: Response) {
  const result = await ReviewServices.updateReviewIntoDb(
    req.user,
    req.params._id,
    req.body
  );

  res.status(result.status).json(result);
});

const approveReview = catchAsync(async function (req: Request, res: Response) {
  const result = await ReviewServices.approveReviewIntoDb(
    req.user,
    req.params.reviewId
  );

  res.status(result.status).json(result);
});

const deleteReview = catchAsync(async function (req: Request, res: Response) {
  const result = await ReviewServices.deleteReviewFromDb(
    req.user,
    req.params._id
  );

  res.status(result.status).json(result);
});

export const ReviewControllers = {
  createNewReview,
  updateReview,
  deleteReview,
  retrieveReviews,
  approveReview,
  retrieveSingleReviews,
};
