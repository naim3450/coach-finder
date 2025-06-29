import { Router } from "express";
import { UserControllers } from "./user.controllers";
import ValidationRequest from "../../middlewares/zod-validation";
import { UserValidations } from "./user.validations";
import Auth from "../../middlewares/auth";
import { userRoles } from "../../constants";

const router: Router = Router();

router.get("/", Auth(userRoles.ADMIN), UserControllers.retrieveAllUsers);
router.get("/:userId", Auth(userRoles.ADMIN), UserControllers.retrieveUser);

router.post(
  "/register",
  ValidationRequest(UserValidations.userCreateValidationSchema),
  UserControllers.createUser
);

router.put(
  "/update",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER),
  ValidationRequest(UserValidations.userUpdateValidationSchema),
  UserControllers.updateUser
);

export const userRoutes = router;
