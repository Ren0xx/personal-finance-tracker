import { H1 } from "@/components/ui/typography";
import PieChartTransactions from "@/components/charts/PieChartTransactions";
import dynamic from "next/dynamic";
import { api } from "@/trpc/server";
import { TransactionsBarChart } from "@/components/charts/BarChartTransactionsMonthly";
import TransactionsList from "@/components/Transactions";
import ExportToCsvButton from "@/components/ExportToCsvButton";
const AddTransactionForm = dynamic(
  () => import("@/components/forms/AddTransactionForm"),
  {
    loading: () => <div>Loading...</div>,
  },
);

export default async function Transactions() {
  const categoriesData = api.category.getAll();
  const transactionData = api.transaction.getAll();

  const [categories, transactions] = await Promise.all([
    categoriesData,
    transactionData,
  ]);

  return (
    <div className="flex flex-col gap-4 text-center">
      <H1 className="mb-8">Your Transactions</H1>
      <AddTransactionForm categories={categories} />
      <TransactionsList transactions={transactions} />
      <ExportToCsvButton data={transactions} title="Transactions" />
      <TransactionsBarChart transactions={transactions} />
      <PieChartTransactions transactions={transactions} />
    </div>
  );
}
