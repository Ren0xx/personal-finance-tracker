"use client";
import { api } from "@/trpc/react";
const useDeleteTransaction = (onSuccessCallbacks: Array<() => void>) => {
  const deleteOne = api.transaction.deleteOne.useMutation({
    onSuccess: () => {
      onSuccessCallbacks.forEach((callback) => callback());
    },
  });
  const removeTransaction = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeTransaction };
};

export default useDeleteTransaction;
