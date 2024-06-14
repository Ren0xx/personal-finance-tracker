import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useTransactions = () => {
  const session = useSession();
  const {
    data: transactions,
    refetch: refetchTransactions,
    isRefetching: isRefetchingTransactions,
    isLoading,
    isError,
  } = api.transaction.getAll.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return {
    transactions,
    refetchTransactions,
    isRefetchingTransactions,
    isLoading,
    isError,
  };
};

export default useTransactions;
