import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useTransactions = () => {
  const session = useSession();
  const {
    data: transactions,
    refetch,
    isRefetching,
    isLoading,
    isError,
  } = api.transaction.getAll.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return {
    transactions,
    refetch,
    isRefetching,
    isLoading,
    isError,
  };
};

export default useTransactions;