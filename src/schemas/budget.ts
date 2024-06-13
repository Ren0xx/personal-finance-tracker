import { z } from "zod";

export const createBudgetSchema = z.object({
  name: z.string().min(3, {
    message: "Name must have at least 3 characters.",
  }),
  description: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid number with up to two decimal places.",
    })
    .min(1, { message: "Amount cannot be empty." })
    .max(10000000, { message: "Amount cannot be larger than 10 milion." }),
  dateRange: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    {
      required_error: "Please select",
    },
  ),
});
