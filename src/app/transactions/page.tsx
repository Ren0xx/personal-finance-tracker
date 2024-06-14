import { H1 } from "@/components/ui/typography";
import { AddTransactionForm } from "../../components/forms/AddTransactionForm";
import TransactionsList from "@/components/Transactions";
import RemoveTransactionForm from "@/components/forms/RemoveTransactionForm";
export default function Transactions() {
  return (
    <div>
      <H1>Transactions</H1>
      <AddTransactionForm />
      <RemoveTransactionForm />
      <TransactionsList />
    </div>
  );
}
