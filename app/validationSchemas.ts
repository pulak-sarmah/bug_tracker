import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(255, "Title must be at most 255 characters long"),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long"),
});
