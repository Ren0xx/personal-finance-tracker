"use client";
import { api } from "@/trpc/react";
const useDeleteTransaction = (onSuccess: () => void) => {
  const deleteOne = api.transaction.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const removeTransaction = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeTransaction };
};

export default useDeleteTransaction;
