"use client";
import { api } from "@/trpc/react";

const useDeleteSavingsGoal = (onSuccess: () => void) => {
  const deleteOne = api.savingsGoal.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const removeSavingsGoal = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeSavingsGoal };
};

export default useDeleteSavingsGoal;
