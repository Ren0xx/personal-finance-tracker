import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useSavingsGoals = () => {
  const session = useSession();
  const {
    data: savingsGoals,
    refetch: refetchSavingsGoals,
    isRefetching: isRefetchingSavingsGoals,
    isError,
    isLoading,
  } = api.savingsGoal.getAll.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return {
    savingsGoals,
    refetchSavingsGoals,
    isRefetchingSavingsGoals,
    isError,
    isLoading,
  };
};

export default useSavingsGoals;
