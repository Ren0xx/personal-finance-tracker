"use client";
import { api } from "@/trpc/react";

const useDeleteSavingsGoal = (refetch: () => void) => {
  const deleteOne = api.savingsGoal.deleteOne.useMutation({
    onSuccess: () => refetch(),
  });
  const removeSavingsGoal = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeSavingsGoal };
};

export default useDeleteSavingsGoal;
