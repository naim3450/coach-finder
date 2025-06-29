import { Request, Response } from "express";
import catchAsync from "../../../utils/catch-async";
import { SubscriptionServices } from "./subscription.services";

const stripe = catchAsync(async function (req: Request, res: Response) {
  const result = await SubscriptionServices.stripe(req.body);

  res.status(result.status).json(result);
});

const success = catchAsync(async function (req: Request, res: Response) {
  const result = await SubscriptionServices.success(req.user, req.body);

  res.status(result.status).json(result);
});

export const SubscriptionControllers = {
  stripe,
  success,
};
