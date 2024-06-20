"use client";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
const useAddTransaction = (onSuccessCallbacks: Array<() => void>) => {
  const createOne = api.transaction.createOne.useMutation({
    onSuccess: () => {
      onSuccessCallbacks.forEach((callback) => callback());
    },
  });
  const { toast } = useToast();
  const addTransaction = async (
    categoryId: string,
    amount: number,
    description?: string,
  ) => {
    await createOne.mutateAsync({ categoryId, amount, description });
    toast({
      title: "Transaction added",
      description: "Transaction added successfully.",
    });
  };
  return { addTransaction };
};

export default useAddTransaction;
