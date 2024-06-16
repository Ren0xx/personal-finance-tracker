"use client";
import { api, type RouterInputs } from "@/trpc/react";
type AddBudget = RouterInputs["budget"]["createOne"];

const useAddBudget = (refetch: () => void) => {
  const createOne = api.budget.createOne.useMutation({
    onSuccess: () => refetch(),
  });
  const addBudget = async ({ ...data }: AddBudget) => {
    await createOne.mutateAsync({ ...data });
  };
  return { addBudget };
};

export default useAddBudget;
