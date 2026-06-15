import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters."),

  targetAmount: z.number().positive("Target amount must be greater than zero."),

  currentAmount: z
    .number()
    .min(0, "Current amount cannot be negative.")
    .optional(),
});
