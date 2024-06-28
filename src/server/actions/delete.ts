"use server";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteAccount() {
  await api.user.deleteAccount();
  redirect("/");
}
export async function deleteSavingsGoal(id: string) {
  await api.savingsGoal.deleteOne({ id });
  revalidatePath("/savings-goals", "page");
}
export async function deleteCategory(id: string) {
  await api.category.deleteOne({ id });
  revalidatePath("/categories", "page");
}
export async function deleteBudget(id: string) {
  await api.budget.deleteOne({ id });
  revalidatePath("/budgets", "page");
}
export async function deleteTransaction(id: string) {
  await api.transaction.deleteOne({ id });
  revalidatePath("/transactions", "page");
  revalidatePath("/categories/[categoryId]", "page");
}
