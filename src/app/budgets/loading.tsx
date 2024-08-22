import { SkeletonBudgetsChart } from "@/components/skeletons/ChartsSkeletons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { H1 } from "@/components/ui/typography";
export default function Loading() {
  return (
    <div className="text-center">
      <H1 className="my-8">Budget</H1>
      <SkeletonBudgetsChart />

      <div className="my-16 flex justify-center gap-4">
        <Button disabled={true}>Add Budget</Button>
        <Button variant="destructive" disabled={true}>
          Delete Budget
        </Button>
      </div>
        <Separator className="my-4" />
        <Button disabled={true}>Export Data To CSV</Button>
    </div>
  );
}
