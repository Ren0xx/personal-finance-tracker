import { H1 } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import EditBudgetForm from "@/components/forms/EditBudgetForm";
import BarChart from "@/components/charts/BarChartBudgets";
import { BasicPageTransition } from "@/components/Animations/PageTransitions";
export default async function Budget({ params }: { params: { name: string } }) {
  const budget = api.budget.getOne({ name: params.name });
  const categories = api.category.getAll();

  const [budgetData, categoriesData] = await Promise.all([budget, categories]);
  if (budget === null) {
    notFound();
  }
  const chartData = {
    label: budgetData.name ?? "Label",
    value: Number(budgetData.amount),
  };

  return (
    <BasicPageTransition className="flex flex-col gap-4 text-center">
      <H1>{budgetData.name}</H1>
      <EditBudgetForm budget={budgetData} categories={categoriesData} />
      <BarChart data={[chartData]} />
    </BasicPageTransition>
  );
}
