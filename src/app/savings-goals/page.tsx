import AddSavingsGoal from "@/components/forms/AddSavingsGoal";
import SavingsGoalsList from "@/components/SavingsGoals";
import { H1 } from "@/components/ui/typography";
export default function SavingsGoals() {
  return (
    <div>
      <H1>Savings Goals</H1>
      <AddSavingsGoal />
      <SavingsGoalsList />
    </div>
  );
}