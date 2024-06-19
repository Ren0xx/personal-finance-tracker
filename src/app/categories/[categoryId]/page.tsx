"use client";
import useUniqueCategory from "@/hooks/GET/useUniqueCategory";
import TransactionsList from "@/components/Transactions";
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
      <TransactionsList
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        transactions={category?.transactions!}
        isLoading={isLoading}
        isError={isError}
        filteringHidden={true}
      />
    </div>
  );
}
