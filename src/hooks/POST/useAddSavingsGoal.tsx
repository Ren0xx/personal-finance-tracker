"use client";
import { api } from "@/trpc/react";
const useAddSavingsGoal = (onSuccess: () => void) => {
  const createOne = api.savingsGoal.createOne.useMutation({
    onSuccess: () => onSuccess(),
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
