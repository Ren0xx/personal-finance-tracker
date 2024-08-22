"use client";
import { type RouterOutputs } from "@/trpc/react";
type Transaction = RouterOutputs["transaction"]["getAll"][0];

import { DataTable } from "@/app/transactions/_components/transactionTable/data-table";
import { columns } from "@/app/transactions/_components/transactionTable/columns";


type TransactionsListProps = {
  transactions: Transaction[];
  filteringHidden?: boolean;
};
const TransactionsList = (props: TransactionsListProps) => {
  const { transactions, filteringHidden } = props;

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
