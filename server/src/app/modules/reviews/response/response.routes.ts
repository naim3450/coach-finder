import { Router } from "express";
import { ResponseControllers } from "./response.controllers";
import Auth from "../../../middlewares/auth";
import ValidationRequest from "../../../middlewares/zod-validation";
import { responseValidationSchema } from "./response.validations";

export const userRoles = {
  ADMIN: "admin",
  CONTRIBUTOR: "contributor",
  CUSTOMER: "customer",
};

const router: Router = Router();

router.get("/", ResponseControllers.retrieveResponses);

router.post(
  "/:reviewId",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ValidationRequest(responseValidationSchema),
  ResponseControllers.createReviewResponse
);

router.patch(
  "/:responseId",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ValidationRequest(responseValidationSchema),
  ResponseControllers.updateResponse
);

router.delete(
  "/:responseId",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ResponseControllers.deleteResponse
);

export const ResponseRoutes = router;
