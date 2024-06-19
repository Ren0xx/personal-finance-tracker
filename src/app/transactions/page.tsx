"use client";

import { H1 } from "@/components/ui/typography";
import { lazy, Suspense } from "react";
import TransactionsList from "@/components/Transactions";
import useTransactions from "@/hooks/GET/useTransactions";
const RemoveTransactionForm = lazy(
  () => import("@/components/forms/RemoveTransactionForm"),
);
const AddTransactionForm = lazy(
  () => import("@/components/forms/AddTransactionForm"),
);
export default function Transactions() {
  const { transactions, isLoading, isError } = useTransactions();
  return (
    <div>
      <H1>Transactions</H1>
      <TransactionsList
        transactions={transactions!}
        isLoading={isLoading}
        isError={isError}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <AddTransactionForm />
        <RemoveTransactionForm />
      </Suspense>
    </div>
  );
}
