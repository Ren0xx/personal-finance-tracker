"use client";
import { H4 } from "@/components/ui/typography";
import useTransactions from "@/hooks/useTransactions";
const TransactionsList = () => {
  const { transactions } = useTransactions();
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
