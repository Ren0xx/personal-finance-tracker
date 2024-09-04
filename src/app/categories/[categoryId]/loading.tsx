import { CategorySkeleton } from "@/components/skeletons/CategoriesSkeleton";
import { H1 } from "@/components/ui/typography";

export default function Loading() {
  return (
    <div>
      <H1>Transactions for category...</H1>
      <CategorySkeleton />
    </div>
  );
}
