"use client";
import { api } from "@/trpc/react";

const useDeleteCategory = (refetch: () => void) => {
  const deleteOne = api.category.deleteOne.useMutation({
    onSuccess: () => refetch(),
  });
  const removeCategory = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  return { removeCategory };
};

export default useDeleteCategory;
