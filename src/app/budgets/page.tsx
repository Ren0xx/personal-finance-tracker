import { api } from "@/trpc/server";
import { H1 } from "@/components/ui/typography";
import AddBudgetForm from "@/components/forms/AddBudgetForm";
import RemoveBudgetForm from "@/components/forms/RemoveBudgetForm";
import BarChart from "@/components/charts/BarChartBudgets";

export default async function Budgets() {
  const categoriesData = api.category.getAll();
  const budgetsData = api.budget.getAll();

  const [categories, budgets] = await Promise.all([
    categoriesData,
    budgetsData,
  ]);
  const chartData = budgets.data.map((budget) => ({
    label: budget.name,
    value: Number(budget.amount),
  }));

  return (
    <div>
      <H1>Budget</H1>
      <BarChart data={chartData} />
      <AddBudgetForm
        categories={categories}
        budgetsNames={budgets.alreadyTakenNames}
      />
      <RemoveBudgetForm budgets={budgets.data} />
    </div>
  );
}
