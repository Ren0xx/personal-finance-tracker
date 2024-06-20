"use client";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
const useDeleteBudget = (onSuccess: () => void) => {
  const deleteOne = api.budget.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const { toast } = useToast();
  const removeBudget = async (id: string) => {
    await deleteOne.mutateAsync({ id });
    toast({
      variant: "destructive",
      title: "Budget removed",
      description: "Budget removed successfully.",
    });
  };
  return { removeBudget };
};

export default useDeleteBudget;
