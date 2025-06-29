import { z } from "zod";

export const responseValidationSchema = z.object({
  body: z.object({
    description: z
      .string({ message: "description must be valid string" })
      .min(1, { message: "description is required" }),
  }),
});
