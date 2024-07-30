import { BarExample } from "@/components/charts/Examples/BarChart";
import { LineExample } from "@/components/charts/Examples/LineChart";
import { PieExample } from "@/components/charts/Examples/PieChart";
import { RadialExample } from "@/components/charts/Examples/RadialChart";
import { H2 } from "./ui/typography";

const ChartExamplesList = () => {
  return (
    <div>
      <H2>Chart Examples:</H2>
      <div className="grid grid-cols-2 gap-4">
        <PieExample />
        <RadialExample />
        <BarExample />
        <LineExample />
      </div>
    </div>
  );
};

export default ChartExamplesList;
