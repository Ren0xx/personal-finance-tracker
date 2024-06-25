import { z } from "zod";
import { type RouterOutputs } from "@/trpc/react";
type SavingsGoal = RouterOutputs["savingsGoal"]["getAll"][0];
export const createSavingsGoalSchema = (existingSavingsGoals: SavingsGoal[]) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, {
        message: "Name must have at least 3 characters.",
      })
      .refine(
        (name) =>
          !existingSavingsGoals.some(
            (goal) => goal.name.toLowerCase() === name.toLowerCase(),
          ),
        { message: "Savings goal already exists" },
      ),
    targetAmount: z
      .string()
      .trim()
      .regex(/^\d+(\.\d{1,2})?$/, {
        message: "Amount must be a valid number with up to two decimal places.",
      })
      .min(1, { message: "Amount cannot be empty." })
      .max(10000000, { message: "Amount cannot be larger than 10 milion." }),
    deadline: z.date({ required_error: "A deadline must be provided" }),
    currentAmount: z
      .string()
      .trim()
      .regex(/^\d+(\.\d{1,2})?$/, {
        message: "Amount must be a valid number with up to two decimal places.",
      })
      .min(1, { message: "Amount cannot be empty." })
      .max(10000000, { message: "Amount cannot be larger than 10 milion." })
      .optional(),
  });
export const deleteSavingsGoalSchema = z.object({
  savingsGoalId: z.string().min(1, {
    message: "Savings goal is required.",
  }),
});
