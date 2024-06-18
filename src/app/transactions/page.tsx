import { H1 } from "@/components/ui/typography";
import { lazy, Suspense } from "react";
import TransactionsList from "@/components/Transactions";
const RemoveTransactionForm = lazy(
  () => import("@/components/forms/RemoveTransactionForm"),
);
const AddTransactionForm = lazy(
  () => import("@/components/forms/AddTransactionForm"),
);
export default function Transactions() {
  return (
    <div>
      <H1>Transactions</H1>
      <TransactionsList />
      <Suspense fallback={<div>Loading...</div>}>
        <AddTransactionForm />
        <RemoveTransactionForm />
      </Suspense>
    </div>
  );
}
