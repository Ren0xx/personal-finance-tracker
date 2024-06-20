"use client";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

const useDeleteSavingsGoal = (onSuccess: () => void) => {
  const deleteOne = api.savingsGoal.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const { toast } = useToast();
  const removeSavingsGoal = async (id: string) => {
    await deleteOne.mutateAsync({ id });
    toast({
      variant: "destructive",
      title: "Savings goal removed",
      description: "Saving goal removed successfully.",
    });
  };
  return { removeSavingsGoal };
};

export default useDeleteSavingsGoal;
