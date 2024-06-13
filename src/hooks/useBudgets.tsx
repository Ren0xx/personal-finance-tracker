import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useBudgets = () => {
  const session = useSession();
  const {
    data: budgets,
    refetch: refetchBudgets,
    isRefetching: isRefetchingBudgets,
    isError,
    isLoading,
  } = api.budget.getAll.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return {
    budgets,
    refetchBudgets,
    isRefetchingBudgets,
    isError,
    isLoading,
  };
};

export default useBudgets;
