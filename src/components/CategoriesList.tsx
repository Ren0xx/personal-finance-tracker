"use client";

import Link from "next/link";
import { type RouterOutputs } from "@/trpc/react";
type Category = RouterOutputs["category"]["getAll"][0];
import { Button } from "@/components/ui/button";

type CategoriesListProps = {
  categories: Category[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      {categories.map((category) => (
        <Button
          asChild
          variant="secondary"
          className="col-span-1 row-auto border-2 border-solid"
          key={category.id}
        >
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default CategoriesList;
