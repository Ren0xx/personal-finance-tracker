"use client";
import { api } from "@/trpc/react";

const useDeleteBudget = (refetch: () => void) => {
  const deleteOne = api.budget.deleteOne.useMutation({
    onSuccess: () => refetch(),
  });
  const removeBudget = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeBudget };
};

export default useDeleteBudget;
