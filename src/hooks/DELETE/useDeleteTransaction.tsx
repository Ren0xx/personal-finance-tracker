"use client";
import { api } from "@/trpc/react";
import useTransactions from "@/hooks/GET/useTransactions";
const useDeleteTransaction = () => {
  const { refetchTransactions, isRefetchingTransactions } = useTransactions();
  const deleteOne = api.transaction.deleteOne.useMutation({
    onSuccess: () => refetchTransactions(),
  });
  const removeTransaction = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeTransaction, isRefetchingTransactions };
};

export default useDeleteTransaction;
