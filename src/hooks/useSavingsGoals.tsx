import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useSavingsGoals = () => {
  const session = useSession();
  const {
    data: savingGoals,
    refetch: refetchSavingGoals,
    isRefetching: isRefetchingSavingGoals,
    isError,
    isLoading,
  } = api.category.getAll.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return {
    savingGoals,
    refetchSavingGoals,
    isRefetchingSavingGoals,
    isError,
    isLoading,
  };
};

export default useSavingsGoals;
