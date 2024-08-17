import { Button } from "@/components//ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { H2 } from "@/components/ui/typography";
const SavingsGoalsSkeleton = () => {
  return (
    <div>
      <div className="my-16 flex justify-center gap-4">
        <Button disabled={true}>Add Savings Goal</Button>
        <Button variant="destructive" disabled={true}>
          Delete Savings Goal
        </Button>
      </div>
      {[...Array<number>(3)].map((_, index) => (
        <Skeleton className="flex flex-col items-center py-8 my-2" key={index}>
          <Skeleton>
            <H2>Goal ... </H2>
          </Skeleton>
          <Skeleton className="h-48 w-48 rounded-full bg-accent-foreground" />
        </Skeleton>
      ))}
    </div>
  );
};

export default SavingsGoalsSkeleton;
