import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
const useUniqueCategory = (categoryId: string) => {
  const session = useSession();
  const {
    data: category,
    refetch: refetchCategory,
    isRefetching: isRefetchingCategory,
    isError,
    isLoading,
  } = api.category.getOne.useQuery(
    { id: categoryId },
    {
      enabled: session !== undefined,
    },
  );
  return {
    category,
    refetchCategory,
    isRefetchingCategory,
    isError,
    isLoading,
  };
};

export default useUniqueCategory;
