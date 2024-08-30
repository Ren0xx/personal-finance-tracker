import { H1 } from "@/components/ui/typography";
import ChartExamplesList from "@/components/ChartExamplesList";
import { BasicPageTransition } from "@/components/Animations/PageTransitions";
export default function Dashboard() {
  return (
    <BasicPageTransition>
      <H1 className="my-8 text-center">Dashboard</H1>
        <ChartExamplesList />
    </BasicPageTransition>
  );
}
