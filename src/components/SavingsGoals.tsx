"use client";

import { H4 } from "@/components/ui/typography";

import { type RouterOutputs } from "@/trpc/react";
type SavingsGoal = RouterOutputs["savingsGoal"]["getAll"][0];

type SavingsGoalsProps = {
  savingsGoals: SavingsGoal[];
};
const SavingsGoalsList = (props: SavingsGoalsProps) => {
  const { savingsGoals } = props;
  return (
    <div>
      {savingsGoals?.map((goal) => {
        return (
          <div key={goal.id}>
            <H4>{goal.name}</H4>
            <H4>Amount: {goal.targetAmount.toString()}</H4>
            <H4>{goal.id}</H4>
          </div>
        );
      })}
    </div>
  );
};

export default SavingsGoalsList;
