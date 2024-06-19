"use client";
import { type RouterOutputs } from "@/trpc/react";
type Transaction = RouterOutputs["transaction"]["getAll"][0];

import { DataTable } from "@/app/transactions/_components/transactionTable/data-table";
import { DataTableSkeleton } from "@/components/skeletons/DataTableTransactionsSkeleton";
import { columns } from "@/app/transactions/_components/transactionTable/columns";

type TransactionsListProps = {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  filteringHidden?: boolean;
};
const TransactionsList = (props: TransactionsListProps) => {
  const { transactions, isLoading, isError, filteringHidden } = props;

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <DataTableSkeleton />
      </div>
    );
  }
  if (isError) {
    return <div>Error..</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={transactions}
        filteringHidden={filteringHidden}
      />
    </div>
  );
};

export default TransactionsList;
