import { z } from "zod";

export const createHabitSchema = z.object({
  title: z.string().min(2, "Title must have at least 2 characters"),
  description: z.string().optional(),
  color: z.string().optional(),
});

export const updateHabitSchema = createHabitSchema.partial();
