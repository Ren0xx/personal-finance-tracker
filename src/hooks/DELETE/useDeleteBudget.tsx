"use client";
import { api } from "@/trpc/react";

const useDeleteBudget = (onSuccess: () => void) => {
  const deleteOne = api.budget.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const removeBudget = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeBudget };
};

export default useDeleteBudget;
