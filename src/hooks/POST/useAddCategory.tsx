"use client";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

const useAddCategory = (onSuccess: () => void) => {
  const createOne = api.category.createOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const {toast} = useToast();
  const addCategory = async (name: string) => {
    await createOne.mutateAsync({ name });
    toast({
      variant: "success",
      title: "Category added",
      description: "Category added successfully.",
    });
  };
  return { addCategory };
};

export default useAddCategory;
