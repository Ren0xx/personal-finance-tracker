import { api } from "@/trpc/server";

import AddCategoryForm from "@/components/forms/AddCategoryForm";
import RemoveCategoryForm from "@/components/forms/RemoveCategoryForm";
import CategoriesList from "@/components/CategoriesList";
import { H1 } from "@/components/ui/typography";
import { BasicPageTransition } from "@/components/Animations/PageTransitions";

export default async function Categories() {
  const categories = await api.category.getAll();
  const categoriesNames = categories.map((category) => category.name);

  return (
    <BasicPageTransition className="flex flex-col gap-2 text-center">
      <H1>Categories</H1>
      <CategoriesList categories={categories} />
      <AddCategoryForm categoriesNames={categoriesNames} />
      <RemoveCategoryForm categories={categories} />
    </BasicPageTransition>
  );
}
