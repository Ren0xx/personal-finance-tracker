import { H1 } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";
export default async function SavingsGoal({
  params,
}: {
  params: { name: string };
}) {
  const savingsGoal = await api.savingsGoal.getOne({ name: params.name });

  if (savingsGoal === null) {
    notFound();
  }
  return (
    <>
      <H1>:{savingsGoal.name}</H1>
      <Button>Edit Savings Goal</Button>
    </>
  );
}
