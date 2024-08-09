import AddSavingsGoal from "@/components/forms/AddSavingsGoal";
import RemoveSavingsGoalForm from "@/components/forms/RemoveSavingsGoal";
import SavingsGoalsList from "@/components/SavingsGoals";
import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";

export default async function SavingsGoals() {
  const savingsGoals = await api.savingsGoal.getAll();
  return (
    <div>
      <H1>Savings Goals</H1>
      <AddSavingsGoal savingsGoalsNames={savingsGoals.alreadyTakenNames} />
      <RemoveSavingsGoalForm savingsGoals={savingsGoals.data} />
      <SavingsGoalsList savingsGoals={savingsGoals.data} />
    </div>
  );
}
