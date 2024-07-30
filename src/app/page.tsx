import { H1 } from "@/components/ui/typography";
import ChartExamplesList from "@/components/ChartExamplesList";
export default function Dashboard() {
  return (
    <div>
      <H1 className="my-8 text-center">Dashboard</H1>
      <ChartExamplesList />
    </div>
  );
}
