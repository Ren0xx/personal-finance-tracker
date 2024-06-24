"use server";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
export async function updateName(name: string) {
  await api.user.updateName({ name });
  revalidatePath("/profile", "page");
}
