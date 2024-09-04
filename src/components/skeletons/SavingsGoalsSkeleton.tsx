import { Button } from "@/components//ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { H1, H2 } from "@/components/ui/typography";
const SavingsGoalsSkeleton = ({
  numberOfGoals = 3,
}: {
  numberOfGoals?: number;
}) => {
  return (
    <div>
      <div className="my-16 flex justify-center gap-4">
        <Button disabled={true}>Add Savings Goal</Button>
        <Button variant="destructive" disabled={true}>
          Delete Savings Goal
        </Button>
      </div>
      <CircleChartSkeleton numberOfGoals={numberOfGoals} />
    </div>
  );
};
const SavingGoalSkeleton = ({
  numberOfGoals = 3,
}: {
  numberOfGoals?: number;
}) => {
  return (
    <div className="text-center">
      <H1>...</H1>
      <CircleChartSkeleton numberOfGoals={numberOfGoals} />
      <Button disabled={true}>Edit Savings Goal</Button>
    </div>
  );
};

const CircleChartSkeleton = ({
  numberOfGoals = 3,
}: {
  numberOfGoals?: number;
}) => {
  return [...Array<number>(numberOfGoals)].map((_, index) => (
    <Skeleton className="my-2 flex flex-col items-center py-8" key={index}>
      <Skeleton>
        <H2>Goal ... </H2>
      </Skeleton>
      <Skeleton className="h-48 w-48 rounded-full bg-accent-foreground" />
    </Skeleton>
  ));
};

export { SavingsGoalsSkeleton, SavingGoalSkeleton };
