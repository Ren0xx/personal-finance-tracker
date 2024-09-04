import { Button } from "@/components//ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableSkeleton } from "@/components/skeletons/DataTableTransactionsSkeleton";
const CategoriesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      {[...Array<number>(8)].map((_, index) => (
        <Button asChild variant="secondary" key={index} disabled={true}>
          <Skeleton />
        </Button>
      ))}
    </div>
  );
};
const CategorySkeleton = () => {
  return (
    <div>
      <DataTableSkeleton numberOfRows={2} />
    </div>
  );
};
export { CategoriesSkeleton, CategorySkeleton };
