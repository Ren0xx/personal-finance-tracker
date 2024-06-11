"use client";
import { api } from "@/trpc/react";
import { H4 } from "@/components/ui/typography";
const TransactionsList = () => {
  const { data: transactions } = api.transaction.getAll.useQuery(undefined, {});
  return (
    <div>
      {transactions?.map((transaction) => {
        return (
          <div key={transaction.id}>
            <H4>{transaction.amount.toString()}</H4>
            <H4>{transaction.id}</H4>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsList;
