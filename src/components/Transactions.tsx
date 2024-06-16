"use client";
import useTransactions from "@/hooks/GET/useTransactions";
import { DataTable } from "@/app/transactions/_components/transactionTable/data-table";
import { columns } from "@/app/transactions/_components/transactionTable/columns";
const TransactionsList = () => {
  const { transactions, isLoading, isError } = useTransactions();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error..</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={transactions!} />
    </div>
  );
};

export default TransactionsList;
