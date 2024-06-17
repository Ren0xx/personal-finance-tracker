"use client";
import { api } from "@/trpc/react";

const useAddCategory = (onSuccess: () => void) => {
  const createOne = api.category.createOne.useMutation({
    onSuccess: () => onSuccess(),
  });
  const addCategory = async (name: string) => {
    await createOne.mutateAsync({ name });
  };
  return { addCategory };
};

export default useAddCategory;
