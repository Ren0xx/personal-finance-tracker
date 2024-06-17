"use client";
import { api } from "@/trpc/react";
const useAddTransaction = (onSuccess: () => void) => {
  const createOne = api.transaction.createOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const addTransaction = async (
    categoryId: string,
    amount: number,
    description?: string,
  ) => {
    await createOne.mutateAsync({ categoryId, amount, description });
  };
  return { addTransaction };
};

export default useAddTransaction;
