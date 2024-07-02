import { H1 } from "@/components/ui/typography";
import AddBudgetForm from "@/components/forms/AddBudgetForm";
import RemoveBudgetForm from "@/components/forms/RemoveBudgetForm";
import ChartComponent from "@/components/charts/BudgetChart";
import { api } from "@/trpc/server";
export default async function Budgets() {
  const categoriesData = api.category.getAll();
  const budgetsData = api.budget.getAll();

  const [categories, budgets] = await Promise.all([
    categoriesData,
    budgetsData,
  ]);
  const budgetsNames = budgets.map((budget) => budget.name);
  const chartData = budgets.map((budget) => ({
    label: budget.name,
    value: Number(budget.amount),
  }));

  return (
    <div>
      <H1>Budget</H1>
      <ChartComponent data={chartData} />
      <AddBudgetForm categories={categories} budgetsNames={budgetsNames} />
      <RemoveBudgetForm budgets={budgets} />
    </div>
  );
}
