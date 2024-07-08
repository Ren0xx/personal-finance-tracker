import { H1 } from "@/components/ui/typography";
import TransactionsList from "@/components/Transactions";
import PieChart from "@/components/charts/PieChart";
import dynamic from "next/dynamic";
import { api } from "@/trpc/server";
const RemoveTransactionForm = dynamic(
  () => import("@/components/forms/RemoveTransactionForm"),
);
const AddTransactionForm = dynamic(
  () => import("@/components/forms/AddTransactionForm"),
);
export default async function Transactions() {
  const categoriesData = api.category.getAll();
  const transactionData = api.transaction.getAll();

  const [categories, transactions] = await Promise.all([
    categoriesData,
    transactionData,
  ]);

  return (
    <div>
      <H1>Transactions</H1>
      <PieChart transactions={transactions} />
      <TransactionsList transactions={transactions} />
      <AddTransactionForm categories={categories} />
      <RemoveTransactionForm transactions={transactions} />
    </div>
  );
}
