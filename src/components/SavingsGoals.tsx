"use client";

import SavingsGoalCard from "@/components/SavingsGoalCard";
import { type RouterOutputs } from "@/trpc/react";
type SavingsGoal = RouterOutputs["savingsGoal"]["getAll"]["data"][0];

type SavingsGoalsProps = {
  savingsGoals: SavingsGoal[];
};
const SavingsGoalsList = (props: SavingsGoalsProps) => {
  const { savingsGoals } = props;
  return (
    <div>
      {savingsGoals?.map((goal) => (
        <SavingsGoalCard key={goal.id} savingsGoal={goal} />
      ))}
    </div>
  );
};

export default SavingsGoalsList;
