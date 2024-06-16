"use client";
import { api } from "@/trpc/react";

const useAddCategory = (refetch: () => void) => {
  const createOne = api.category.createOne.useMutation({
    onSuccess: () => refetch(),
  });
  const addCategory = async (name: string) => {
    await createOne.mutateAsync({ name });
  };
  return { addCategory };
};

export default useAddCategory;
