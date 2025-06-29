import { Request, Response } from "express";
import catchAsync from "../../../utils/catch-async";
import { UserServices } from "./user.services";

// retrieve users
const retrieveAllUsers = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await UserServices.retrieveAllUsersFromDb(req.query);

  res.status(result.status).json(result);
});

// retrieve user
const retrieveUser = catchAsync(async function (req: Request, res: Response) {
  const result = await UserServices.retrieveSingleUserFromDb(req.params.userId);

  res.status(result.status).json(result);
});

// create user
const createUser = catchAsync(async function (req: Request, res: Response) {
  const result = await UserServices.createUserIntoDb(req.body);

  res.status(result.status).json(result);
});

// update user
const updateUser = catchAsync(async function (req: Request, res: Response) {
  const result = await UserServices.updateUserIntoDb(req.user, req.body);

  res.status(result.status).json(result);
});

export const UserControllers = {
  createUser,
  updateUser,
  retrieveAllUsers,
  retrieveUser,
};
