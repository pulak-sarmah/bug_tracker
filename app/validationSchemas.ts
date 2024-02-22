import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(255, "Title must be at most 255 characters long"),
  description: z
    .string()
    .max(65535)
    .min(1, "Description must be at least 1 character long"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(255, "Title must be at most 255 characters long")
    .optional(),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long")
    .max(65535)
    .optional(),

  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
