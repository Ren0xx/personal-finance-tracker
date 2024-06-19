"use client";
import useUniqueCategory from "@/hooks/GET/useUniqueCategory";
export default function Category({
  params,
}: {
  params: { categoryId: string };
}) {
  const { category, isLoading, isError } = useUniqueCategory(params.categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <h1>Category name: {category.name} </h1>
    </div>
  );
}
