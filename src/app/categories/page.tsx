"use client";
import { H1 } from "@/components/ui/typography";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import RemoveCategoryForm from "@/components/forms/RemoveCategoryForm";
import { api } from "@/trpc/react";
export default function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = api.category.getAll.useQuery(undefined, {});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="flex flex-col gap-2">
      <H1>Categories</H1>
      <AddCategoryForm isRefetching={isRefetching} refetch={refetch} />
      <RemoveCategoryForm
        categories={categories!}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    </div>
  );
}
