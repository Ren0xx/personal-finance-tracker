import { api } from "@/trpc/server";
import { H1 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator"
import AddBudgetForm from "@/components/forms/AddBudgetForm";
import RemoveBudgetForm from "@/components/forms/RemoveBudgetForm";
import BarChart from "@/components/charts/BarChartBudgets";
import ExportToCsvButton from "@/components/ExportToCsvButton";

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
    <div className="text-center">
      <H1 className="my-8">Budget</H1>
      <BarChart data={chartData} />
      <div className="my-16 flex justify-center gap-4">
        <AddBudgetForm
          categories={categories}
          budgetsNames={budgets.alreadyTakenNames}
        />
        <RemoveBudgetForm budgets={budgets.data} />
      </div>
      <Separator className="my-4"/>
      <ExportToCsvButton data={budgets.data} title="Budgets" />
    </div>
  );
}
