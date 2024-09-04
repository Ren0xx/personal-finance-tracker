import { H1 } from "@/components/ui/typography";
import {SavingsGoalsSkeleton} from "@/components/skeletons/SavingsGoalsSkeleton";
export default function Loading() {
  return (
    <div className="text-center">
      <H1>Savings Goals</H1>
      <SavingsGoalsSkeleton />
    </div>
  );
}
