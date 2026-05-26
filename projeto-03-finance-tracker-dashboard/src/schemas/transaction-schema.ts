import z from "zod";

export const transactionSchema = z.object({
  title: z.string().min(2, "Title must have at least 2 characters"),
  amount: z.number().positive("Amount must be greater than zero"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});
