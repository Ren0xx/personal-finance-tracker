import { z } from "zod";

export const createTransactionSchema = z.object({
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  amount: z
    .string()
    .trim()
    .regex(/^[-]?\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid number with up to two decimal places.",
    })
    .min(1, { message: "Amount cannot be empty." })
    .max(10000000, { message: "Amount cannot be larger than 10 milion." }),
  description: z.string().optional(),
});
export const deleteTransactionSchema = z.object({
  transactionId: z.string().min(1, {
    message: "Transaction is required.",
  }),
});
