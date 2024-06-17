"use client";
import { api, type RouterInputs } from "@/trpc/react";
type AddBudget = RouterInputs["budget"]["createOne"];

const useAddBudget = (onSuccess: () => void) => {
  const createOne = api.budget.createOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const addBudget = async ({ ...data }: AddBudget) => {
    await createOne.mutateAsync({ ...data });
  };
  return { addBudget };
};

export default useAddBudget;
