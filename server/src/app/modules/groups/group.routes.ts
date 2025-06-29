import { Router } from "express";
import { GroupControllers } from "./group.controllers";
import Auth from "../../middlewares/auth";
import { userRoles } from "../../constants";
import ValidationRequest from "../../middlewares/zod-validation";
import { GroupValidations } from "./group.validations";
import { saveGroupControllers } from "./save-groups/save-group.controllers";

const router: Router = Router();

router.get("/", GroupControllers.getGroups);
router.get(
  "/:groupId",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER),
  GroupControllers.getSingleGroup
);

router.get(
  "/save/:userId",
  Auth(userRoles.ADMIN, userRoles.CUSTOMER),
  saveGroupControllers.retrieveSaveGroups
);

router.post(
  "/",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ValidationRequest(GroupValidations.createGroupValidationSchema),
  GroupControllers.createGroup
);

router.post(
  "/save/:groupId",
  Auth(userRoles.CUSTOMER),
  saveGroupControllers.saveUnsaveGroup
);

router.patch(
  "/archive",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  GroupControllers.archiveGroups
);

router.patch(
  "/:groupId",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ValidationRequest(GroupValidations.updateGroupValidationSchema),
  GroupControllers.updateGroup
);

router.delete(
  "/",
  Auth(userRoles.ADMIN, userRoles.CONTRIBUTOR),
  ValidationRequest(GroupValidations.archiveOrDeleteGroupsValidationSchema),
  GroupControllers.deleteGroup
);

export const groupRoutes = router;
