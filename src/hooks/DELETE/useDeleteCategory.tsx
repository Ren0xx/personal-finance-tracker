"use client";
import { api } from "@/trpc/react";

const useDeleteCategory = (onSuccess: () => void) => {
  const deleteOne = api.category.deleteOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const removeCategory = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeCategory };
};

export default useDeleteCategory;
