import { Router } from "express";
import { SubscriptionControllers } from "./subscription.controllers";
import Auth from "../../middlewares/auth";
import {
  paymentSuccessValidationSchema,
  stripePaymentValidationSchema,
} from "./subscription.validations";
import ValidationRequest from "../../middlewares/zod-validation";
import { userRoles } from "../../constants";

const router: Router = Router();

router.post(
  "/payment",
  Auth(userRoles.CONTRIBUTOR),
  ValidationRequest(stripePaymentValidationSchema),
  SubscriptionControllers.stripe
);

router.patch(
  "/success",
  Auth(userRoles.CONTRIBUTOR),
  ValidationRequest(paymentSuccessValidationSchema),
  SubscriptionControllers.success
);

export const subscriptionRoutes = router;
