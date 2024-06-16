"use client";
import { api } from "@/trpc/react";
const useAddSavingsGoal = (refetch: () => void) => {
  const createOne = api.savingsGoal.createOne.useMutation({
    onSuccess: () => refetch(),
  });
  const addSavingsGoal = async (
    name: string,
    targetAmount: number,
    deadline: Date,
    currentAmount?: number,
  ) => {
    await createOne.mutateAsync({
      name,
      targetAmount,
      deadline,
      currentAmount,
    });
  };
  return { addSavingsGoal };
};

export default useAddSavingsGoal;
