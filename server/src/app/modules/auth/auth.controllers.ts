import { Request, Response } from "express";
import catchAsync from "../../../utils/catch-async";
import { AuthServices } from "./auth.services";

const getAuthUser = catchAsync(async function (req: Request, res: Response) {
  const result = await AuthServices.getAuthUserFromDb(req.user);
  res.status(result.status).json(result);
});

const verifyAccount = catchAsync(async function (req: Request, res: Response) {
  const result = await AuthServices.verifyAccountIntoDb(req.body);
  res.status(result.status).json(result);
});

const loginUser = catchAsync(async function (req: Request, res: Response) {
  const result = await AuthServices.loginUserFromDb(req.body);

  if (result.success) {
    res.cookie("accessToken", result.data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
  res.status(result.status).json(result);
});

const changePassword = catchAsync(async function (req: Request, res: Response) {
  const result = await AuthServices.changePasswordIntoDb(req.user, req.body);

  res.status(result.status).json(result);
});

const forgotPassword = catchAsync(async function (req: Request, res: Response) {
  const result = await AuthServices.forgotPasswordIntoDb(req.body);

  res.status(result.status).json(result);
});

const resetPassword = catchAsync(async function (req: Request, res: Response) {
  const result = await AuthServices.resetPasswordIntoDb(req.body);

  res.status(result.status).json(result);
});

export const AuthControllers = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAuthUser,
  verifyAccount,
};
