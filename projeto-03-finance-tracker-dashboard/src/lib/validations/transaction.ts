import { z } from "zod";

export const updateTransactionSchema = z.object({
  title: z.string().min(3),
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.string(),
  date: z.string(),
  description: z.string().optional(),
});
