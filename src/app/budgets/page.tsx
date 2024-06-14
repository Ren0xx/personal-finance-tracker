import { H1 } from "@/components/ui/typography";
import AddBudgetForm from "@/components/forms/AddBudgetForm";
import RemoveBudgetForm from "@/components/forms/RemoveBudgetForm";
export default function Billings() {
  return (
    <div>
      <H1>Budget</H1>
      <AddBudgetForm />
      <RemoveBudgetForm />
    </div>
  );
}
