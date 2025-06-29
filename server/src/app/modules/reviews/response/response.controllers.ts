import { Request, Response } from "express";
import catchAsync from "../../../../utils/catch-async";
import { ResponseServices } from "./response.services";

const retrieveResponses = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await ResponseServices.getResponsesFromDb(req.query);

  res.status(result.status).json(result);
});

const createReviewResponse = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await ResponseServices.createReviewResponseIntoDb(
    req.user,
    req.params.reviewId,
    req.body
  );

  res.status(result.status).json(result);
});

const updateResponse = catchAsync(async function (req: Request, res: Response) {
  const result = await ResponseServices.updateResponseIntoDb(
    req.user,
    req.params.responseId,
    req.body
  );

  res.status(result.status).json(result);
});

const deleteResponse = catchAsync(async function (req: Request, res: Response) {
  const result = await ResponseServices.deleteResponseFromDb(
    req.user,
    req.params.responseId
  );

  res.status(result.status).json(result);
});

export const ResponseControllers = {
  createReviewResponse,
  updateResponse,
  deleteResponse,
  retrieveResponses,
};
