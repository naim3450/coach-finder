import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import { AuthValidations } from "./auth.validations";
import ValidationRequest from "../../middlewares/zod-validation";
import Auth from "../../middlewares/auth";
import { userRoles } from "../../constants";

const router: Router = Router();

router.get(
  "/me",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER),
  AuthControllers.getAuthUser
);

router.patch(
  "/verify",
  ValidationRequest(AuthValidations.verifyEmailValidationSchema),
  AuthControllers.verifyAccount
);

router.post(
  "/login",
  ValidationRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);

router.patch(
  "/change-password",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER),
  ValidationRequest(AuthValidations.passwordChangeValidationSchema),
  AuthControllers.changePassword
);

router.post(
  "/forgot-password",
  ValidationRequest(AuthValidations.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword
);

router.patch(
  "/reset-password",
  ValidationRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

export const AuthRoutes = router;
