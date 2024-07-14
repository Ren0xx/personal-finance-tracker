"use server";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

import { type RouterInputs } from "@/trpc/react";
type AddBudget = RouterInputs["budget"]["createOne"];
type AddTransaction = RouterInputs["transaction"]["createOne"];
type AddSavingsGoal = RouterInputs["savingsGoal"]["createOne"];
export async function createSavingsGoal(addSavingsGoal: AddSavingsGoal) {
  await api.savingsGoal.createOne(addSavingsGoal);
  revalidatePath("/savings-goals", "page");
}

export async function createCategory(name: string) {
  await api.category.createOne({ name });
  revalidatePath("/categories", "page");
}
export async function createBudget(addBudgetData: AddBudget) {
  await api.budget.createOne(addBudgetData);
  revalidatePath("/budgets", "page");
}
export async function createTransaction(addTransactionData: AddTransaction) {
  await api.transaction.createOne(addTransactionData);
  revalidatePath("/transactions", "page");
  revalidatePath("/categories/[categoryId]", "page");
}
