import ExportToCsvButton from "@/components/ExportToCsvButton";
import AddSavingsGoal from "@/components/forms/AddSavingsGoal";
import RemoveSavingsGoalForm from "@/components/forms/RemoveSavingsGoal";
import SavingsGoalsList from "@/components/SavingsGoals";
import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";

import { BasicPageTransition } from "@/components/Animations/PageTransitions";

export default async function SavingsGoals() {
  const savingsGoals = await api.savingsGoal.getAll();
  return (
    <BasicPageTransition className="text-center">
      <H1> Savings Goals</H1>
      <div className="my-16 flex justify-center gap-4">
        <AddSavingsGoal savingsGoalsNames={savingsGoals.alreadyTakenNames} />
        <RemoveSavingsGoalForm savingsGoals={savingsGoals.data} />
      </div>
      <SavingsGoalsList savingsGoals={savingsGoals.data} />
      <ExportToCsvButton data={savingsGoals.data} title="Savings_Goals" />
    </BasicPageTransition>
  );
}
