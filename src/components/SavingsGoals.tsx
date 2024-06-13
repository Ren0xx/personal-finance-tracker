"use client";

import useSavingsGoals from "@/hooks/useSavingsGoals";
import { H4 } from "@/components/ui/typography";
const SavingsGoalsList = () => {
  const { savingsGoals } = useSavingsGoals();
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
