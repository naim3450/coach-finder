import { Request, Response } from "express";
import catchAsync from "../../../utils/catch-async";
import { GroupServices } from "./group.services";

const getGroups = catchAsync(async function (req: Request, res: Response) {
  const result = await GroupServices.getGroupsFromDb(req.query);

  res.status(result.status).json(result);
});

const getSingleGroup = catchAsync(async function (req: Request, res: Response) {
  const result = await GroupServices.getSingleGroupFromDb(
    req.user,
    req.params.groupId
  );

  res.status(result.status).json(result);
});

const createGroup = catchAsync(async function (req: Request, res: Response) {
  const result = await GroupServices.createNewGroupIntoDb(req.user, req.body);

  res.status(result.status).json(result);
});

const updateGroup = catchAsync(async function (req: Request, res: Response) {
  const result = await GroupServices.updateGroupIntoDb(
    req.user,
    req.params.groupId,
    req.body
  );

  res.status(result.status).json(result);
});

const archiveGroups = catchAsync(async function (req: Request, res: Response) {
  const result = await GroupServices.archiveGroupsIntoDb(
    req.user,
    req.body.ids
  );

  res.status(result.status).json(result);
});

const deleteGroup = catchAsync(async function (req: Request, res: Response) {
  const result = await GroupServices.deleteGroupFromDb(req.user, req.body.ids);

  res.status(result.status).json(result);
});

export const GroupControllers = {
  createGroup,
  updateGroup,
  deleteGroup,
  getGroups,
  getSingleGroup,
  archiveGroups,
};
