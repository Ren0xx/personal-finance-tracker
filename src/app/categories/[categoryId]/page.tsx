"use client";
import useUniqueCategory from "@/hooks/GET/useUniqueCategory";
import TransactionsList from "@/components/Transactions";
import { H1 } from "@/components/ui/typography";
import { Suspense } from "react";
import { notFound } from "next/navigation";
export default function Category({
  params,
}: {
  params: { categoryId: string };
}) {
  const { category, isLoading, isError } = useUniqueCategory(params.categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || category === null || category === undefined) {
    notFound();
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <H1>Transactions for category: {category.name}</H1>
        <TransactionsList
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          transactions={category?.transactions}
          isLoading={isLoading}
          isError={isError}
          filteringHidden={true}
        />
      </Suspense>
    </>
  );
}
