"use client";
import { H1 } from "@/components/ui/typography";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import RemoveCategoryForm from "@/components/forms/RemoveCategoryForm";
import useCategories from "@/hooks/GET/useCategories";
export default function Categories() {
  const {
    categories,
    isLoading,
    isError,
    refetchCategories,
    isRefetchingCategories,
  } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="flex flex-col gap-2">
      <H1>Categories</H1>
      <AddCategoryForm
        categories={categories!}
        refetch={refetchCategories}
        isRefetching={isRefetchingCategories}
      />
      <RemoveCategoryForm
        categories={categories!}
        refetch={refetchCategories}
        isRefetching={isRefetchingCategories}
      />
    </div>
  );
}
