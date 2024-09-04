import { Button } from "@/components/ui/button";
import { SkeletonBudgetsChart } from "@/components/skeletons/ChartsSkeletons";
import { H1 } from "@/components/ui/typography";

const BudgetSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <H1>...</H1>
      <Button disabled={true} className="self-center">Edit budget</Button>
      <SkeletonBudgetsChart />
    </div>
  );
};
export { BudgetSkeleton };
