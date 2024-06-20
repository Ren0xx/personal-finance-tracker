"use client";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
const useDeleteCategory = (onSuccess: () => void) => {
  const deleteOne = api.category.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const {toast} = useToast();
  const removeCategory = async (id: string) => {
    await deleteOne.mutateAsync({ id });
    toast({
      variant: "destructive",
      title: "Category removed",
      description: "Category removed successfully.",
    });
  };
  return { removeCategory };
};

export default useDeleteCategory;
