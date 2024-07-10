import { api } from "@/trpc/server";

import AddCategoryForm from "@/components/forms/AddCategoryForm";
import RemoveCategoryForm from "@/components/forms/RemoveCategoryForm";
import CategoriesList from "@/components/CategoriesList";
import { H1 } from "@/components/ui/typography";

export default async function Categories() {
  const categories = await api.category.getAll();
  const categoriesNames = categories.map((category) => category.name);

  return (
    <div className="flex flex-col gap-2">
      <H1>Categories</H1>
      <CategoriesList categories={categories} />
      <AddCategoryForm categoriesNames={categoriesNames} />
      <RemoveCategoryForm categories={categories} />
    </div>
  );
}
