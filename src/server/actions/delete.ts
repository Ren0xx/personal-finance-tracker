"use server";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export async function deleteAccount() {
  await api.user.deleteAccount();
  redirect("/");
}
