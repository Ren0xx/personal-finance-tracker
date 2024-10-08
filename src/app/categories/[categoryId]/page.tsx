import TransactionsList from "@/components/Transactions";
import { H1 } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { BasicPageTransition } from "@/components/Animations/PageTransitions";
export default async function Category({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await api.category.getOne({ id: params.categoryId });

  if (category === null) {
    notFound();
  }
  return (
    <BasicPageTransition>
      <H1>Transactions for category: {category.name}</H1>
      <TransactionsList
        transactions={category.transactions}
        filteringHidden={true}
      />
    </BasicPageTransition>
  );
}
