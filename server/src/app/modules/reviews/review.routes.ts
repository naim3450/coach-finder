import { Router } from "express";
import Auth from "../../middlewares/auth";
import { userRoles } from "../../constants";
import { ReviewControllers } from "./review.controllers";
import ValidationRequest from "../../middlewares/zod-validation";
import { ReviewValidations } from "./review.validation";
import { ResponseRoutes } from "./response/response.routes";

const router: Router = Router();
// response
router.use("/response", ResponseRoutes);

router.get("/", ReviewControllers.retrieveReviews);

router.get(
  "/:reviewId",
  Auth(userRoles.CUSTOMER, userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ReviewControllers.retrieveSingleReviews
);

router.post(
  "/",
  Auth(userRoles.CUSTOMER),
  ValidationRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createNewReview
);

router.patch(
  "/:_id",
  Auth(userRoles.CUSTOMER),
  ValidationRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewControllers.updateReview
);

router.patch(
  "/approve/:reviewId",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ReviewControllers.approveReview
);

router.delete(
  "/:_id",
  Auth(userRoles.CUSTOMER, userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ReviewControllers.deleteReview
);

export const reviewRoutes = router;
