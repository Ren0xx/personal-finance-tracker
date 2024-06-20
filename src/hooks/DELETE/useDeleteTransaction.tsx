"use client";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
const useDeleteTransaction = (onSuccessCallbacks: Array<() => void>) => {
  const { toast } = useToast();
  const deleteOne = api.transaction.deleteOne.useMutation({
    onSuccess: () => {
      onSuccessCallbacks.forEach((callback) => callback());
    },
  });
  const removeTransaction = async (id: string) => {
    await deleteOne.mutateAsync({ id });
    toast({
      variant: "destructive",
      title: "Transaction removed",
      description: "Transaction removed successfully.",
    });
  };
  return { removeTransaction };
};

export default useDeleteTransaction;
