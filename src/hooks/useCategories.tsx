import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useCategories = () => {
  const session = useSession();
  const {
    data: categories,
    refetch,
    isRefetching,
    isError,
    isLoading,
  } = api.category.getAll.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return {
    categories,
    refetch,
    isRefetching,
    isError,
    isLoading,
  };
};

export default useCategories;
