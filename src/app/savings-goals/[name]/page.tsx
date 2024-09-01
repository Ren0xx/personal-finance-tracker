import { H1 } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import SavingsGoalCard from "@/components/SavingsGoalCard";
import EditSavingGoal from "@/components/forms/EditSavingsGoal";
import { BasicPageTransition } from "@/components/Animations/PageTransitions";
export default async function SavingsGoal({
  params,
}: {
  params: { name: string };
}) {
  const savingsGoal = await api.savingsGoal.getOne({ name: params.name });

  if (savingsGoal.name === undefined) {
    notFound();
  }
  return (
    <BasicPageTransition className="flex flex-col gap-4 text-center">
      <H1>{savingsGoal.name}</H1>
      <SavingsGoalCard savingsGoal={savingsGoal} />
      <EditSavingGoal savingsGoal={savingsGoal} />
    </BasicPageTransition>
  );
}
