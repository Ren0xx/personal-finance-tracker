import { type RouterOutputs } from "@/trpc/react";
type Transaction = RouterOutputs["transaction"]["getAll"][0];
type TransactionProps = {
  transaction: Transaction;
};
const Transaction = ({transaction}: TransactionProps) => {
  return <div></div>;
};

export default Transaction;
