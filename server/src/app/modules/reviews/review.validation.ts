import { z } from "zod";

export const createReviewValidationSchema = z.object({
  body: z.object({
    group: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid group ObjectId"),
    rating: z.number().min(1).max(5),
    review: z.string().min(1, "Review cannot be empty"),
  }),
});

export const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    review: z.string().min(1, "Review cannot be empty").optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
