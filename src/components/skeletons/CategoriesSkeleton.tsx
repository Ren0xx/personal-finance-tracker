import { Button } from "@/components//ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

export default CategoriesSkeleton;
