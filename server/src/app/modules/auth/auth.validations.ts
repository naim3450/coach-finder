import { string, z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
  }),
});

const passwordChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(0, "Old password required"),
    newPassword: z.string().min(0, " password required"),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    newPassword: z.string().min(0, " password required"),
    verificationCode: z.number().int().min(1000).max(9999),
  }),
});

const verifyEmailValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    verificationCode: z.number().int().min(1000).max(9999),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  passwordChangeValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
  verifyEmailValidationSchema,
};
