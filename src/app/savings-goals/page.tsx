import AddSavingsGoal from "@/components/forms/AddSavingsGoal";
import RemoveSavingsGoalForm from "@/components/forms/RemoveSavingsGoal";
import SavingsGoalsList from "@/components/SavingsGoals";
import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";

export default async function SavingsGoals() {
  const savingsGoals = await api.savingsGoal.getAll();
  const savingsGoalsNames = savingsGoals.map((goal) => goal.name);
  //TODO
  // get all savings goals names from server
  return (
    <div>
      <H1>Savings Goals</H1>
      <AddSavingsGoal savingsGoalsNames={savingsGoalsNames} />
      <RemoveSavingsGoalForm savingsGoals={savingsGoals} />
      <SavingsGoalsList savingsGoals={savingsGoals} />
    </div>
  );
}
