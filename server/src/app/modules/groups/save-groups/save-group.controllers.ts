import { Request, Response } from "express";
import catchAsync from "../../../../utils/catch-async";
import { saveGroupServices } from "./save-group.services";

const retrieveSaveGroups = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await saveGroupServices.retrieveSaveGroupsFromDb(
    req.params.userId
  );

  res.status(result.status).json(result);
});

const saveUnsaveGroup = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await saveGroupServices.saveUnsaveGroupIntoDb(
    req.user,
    req.params.groupId
  );

  res.status(result.status).json(result);
});

export const saveGroupControllers = {
  saveUnsaveGroup,
  retrieveSaveGroups,
};
