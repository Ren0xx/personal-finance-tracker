"use server";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { type RouterInputs } from "@/trpc/react";
import { redirect } from "next/navigation";

type UpdateSavingsGoal = RouterInputs["savingsGoal"]["updateOne"];
type UpdateBudget = RouterInputs["budget"]["updateOne"];
export async function updateName(name: string) {
  await api.user.updateName({ name });
  revalidatePath("/profile", "page");
}

export async function updateSavingsGoal(updateSavingsGoal: UpdateSavingsGoal) {
  await api.savingsGoal.updateOne(updateSavingsGoal);
  redirect(`/savings-goals/${updateSavingsGoal.name}`);
}
export async function updateBudget(updateBudget: UpdateBudget) {
  await api.budget.updateOne(updateBudget);
  redirect(`/budgets/${updateBudget.name}`);
}