import { z } from "zod";

const createGroupValidationSchema = z.object({
  body: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Name is required"),
        country: z.string().trim().min(1, "Country is required"),
        city: z.string().trim().min(1, "City is required"),
        industry: z
          .array(z.string())
          .min(1, "At least one industry is required"),
        goals: z.array(z.string()).min(1, "At least one goal is required"),
        focus_area: z
          .array(z.string())
          .min(1, "At least one focus area is required"),
        key_topics: z
          .array(z.string())
          .min(1, "At least one key topic is required"),
        about: z.string().trim().min(1, "About information is required"),
        meeting_format: z.string().trim().min(1, "Meeting format is required"),
        pricing: z.number().positive("Pricing must be a positive number"),
        registration_link: z
          .string()
          .trim()
          .min(1, "Registration link is required"),
        review: z.boolean(),
        profile_picture: z
          .string()
          .trim()
          .min(1, "Profile picture is required"),
        cover_picture: z.string().trim().optional(),
        video: z.string().trim().optional(),
        promotional_banner: z.string().trim().optional(),
      })
    )
    .min(1, "At least one group is required"),
});

const updateGroupValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required").optional(),
    country: z.string().trim().min(1, "Country is required").optional(),
    city: z.string().trim().min(1, "City is required").optional(),
    industry: z
      .array(z.string())
      .min(1, "At least one industry is required")
      .optional(),
    goals: z
      .array(z.string())
      .min(1, "At least one goal is required")
      .optional(),
    focus_area: z
      .array(z.string())
      .min(1, "At least one focus area is required")
      .optional(),
    key_topics: z
      .array(z.string())
      .min(1, "At least one key topic is required")
      .optional(),
    about: z.string().trim().min(1, "About information is required").optional(),
    meeting_format: z
      .string()
      .trim()
      .min(1, "Meeting format is required")
      .optional(),
    pricing: z
      .number()
      .positive("Pricing must be a positive number")
      .optional(),
    registration_link: z
      .string()
      .trim()
      .min(1, "Registration link is required")
      .optional(),
    review: z.boolean().optional(),
    profile_picture: z
      .string()
      .trim()
      .min(1, "Profile picture is required")
      .optional(),
    cover_picture: z.string().trim().optional().optional(),
    video: z.string().trim().optional().optional(),
    promotional_banner: z.string().trim().optional(),
  }),
});

const archiveOrDeleteGroupsValidationSchema = z.object({
  body: z.object({
    ids: z
      .array(z.string())
      .min(1, "The 'ids' array must contain at least one element."),
  }),
});

export const GroupValidations = {
  createGroupValidationSchema,
  updateGroupValidationSchema,
  archiveOrDeleteGroupsValidationSchema,
};
