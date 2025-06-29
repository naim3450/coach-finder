import { z } from "zod";
import { userRoles, userType } from "../../constants";

const QuizSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z
    .union([
      z.string().min(1, "Answer is required"),
      z.array(z.string().min(1)).nonempty("Answer array must not be empty"),
    ])
    .refine(
      (value) => typeof value === "string" || Array.isArray(value),
      "Answer must be a string or a non-empty array of strings"
    ),
});

const userCreateValidationSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    profile_picture: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).default("other"),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    role: z
      .enum([userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER])
      .default(userRoles.CUSTOMER),
    account_type: z
      .enum([
        userType.ADVANCE,
        userType.BASIC,
        userType.ESSENTIAL,
        userType.PREMIUM,
      ])
      .default(userType.BASIC),
    quiz: z.array(QuizSchema).default([]),
  }),
});

const userUpdateValidationSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, "First name is required").optional(),
    last_name: z.string().min(1, "Last name is required").optional(),
    profile_picture: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(1, "Password is required").optional(),
    role: z
      .enum([userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER])
      .default(userRoles.CUSTOMER)
      .optional(),
    account_type: z
      .enum([
        userType.ADVANCE,
        userType.BASIC,
        userType.ESSENTIAL,
        userType.PREMIUM,
      ])
      .default(userType.BASIC)
      .optional(),
    quiz: z.array(QuizSchema).default([]).optional(),
  }),
});

export const UserValidations = {
  userCreateValidationSchema,
  userUpdateValidationSchema,
};
