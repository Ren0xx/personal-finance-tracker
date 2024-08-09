import { H1 } from "@/components/ui/typography";
import TransactionsList from "@/components/Transactions";
import PieChartTransactions from "@/components/charts/PieChartTransactions";
import dynamic from "next/dynamic";
import { api } from "@/trpc/server";
import { TransactionsBarChart } from "@/components/charts/BarChartTransactionsMonthly";

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
    <div className="flex flex-col gap-4 ">
      <H1>Your Transactions</H1>
      <TransactionsList transactions={transactions} />
      <AddTransactionForm categories={categories} />
      <TransactionsBarChart transactions={transactions} />
      <PieChartTransactions transactions={transactions} />
    </div>
  );
}
