import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must have at least 2 characters"),

  type: z.enum(["INCOME", "EXPENSE"]),

  color: z.string().min(4, "Color is required"),
});
