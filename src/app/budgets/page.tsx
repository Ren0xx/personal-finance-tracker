import { H1 } from "@/components/ui/typography";
import AddBudgetForm from "@/components/forms/AddBudgetForm";
import RemoveBudgetForm from "@/components/forms/RemoveBudgetForm";
import { api } from "@/trpc/server";
export default async function Billings() {
  const categoriesData = api.category.getAll();
  const budgetsData = api.budget.getAll();

  const [categories, budgets] = await Promise.all([
    categoriesData,
    budgetsData,
  ]);
  const budgetsNames = budgets.map((budget) => budget.name);
  return (
    <div>
      <H1>Budget</H1>
      <AddBudgetForm categories={categories} budgetsNames={budgetsNames} />
      <RemoveBudgetForm budgets={budgets} />
    </div>
  );
}
