"use client";
import { api } from "@/trpc/react";

import { useToast } from "@/components/ui/use-toast";
const useAddSavingsGoal = (onSuccess: () => void) => {
  const createOne = api.savingsGoal.createOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const {toast} = useToast();
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
    toast({
      variant: "success",
      title: "Savings goal added",
      description: "Savings goal added successfully.",
    });
  };
  return { addSavingsGoal };
};

export default useAddSavingsGoal;
