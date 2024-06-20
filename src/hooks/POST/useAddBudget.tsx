"use client";
import { api, type RouterInputs } from "@/trpc/react";
type AddBudget = RouterInputs["budget"]["createOne"];

import { useToast } from "@/components/ui/use-toast";

const useAddBudget = (onSuccess: () => void) => {
  const createOne = api.budget.createOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const {toast} = useToast();
  const addBudget = async ({ ...data }: AddBudget) => {
    await createOne.mutateAsync({ ...data });
    toast({
      variant: "success",
      title: "Budget added",
      description: "Budget added successfully.",
    });
  };
  return { addBudget };
};

export default useAddBudget;
