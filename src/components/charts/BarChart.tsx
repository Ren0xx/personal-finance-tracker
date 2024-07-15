"use client";

import {
  Bar,
  BarChart as Chart,
  CartesianGrid,
  LabelList,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRouter } from "next/navigation";

const chartConfig = {
  value: {
    label: "Budget",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type BudgetData = {
  label: string;
  value: number;
};

type BarChartComponentProps = {
  data: BudgetData[];
};
type Payload = {
  label: string;
  value: number;
  [key: string]: number | string;
};

type ClickEvent = {
  payload: Payload;
  [key: string]: Payload;
};
function BarChart({ data }: BarChartComponentProps) {
  const router = useRouter();
  const handleBarClick = (e: ClickEvent) => {
    const { payload } = e;
    router.push(`/budgets/${payload.label}`);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Budget</CardTitle>
        <CardDescription>Monthly Budget Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <Chart accessibilityLayer data={data} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              className="cursor-pointer"
              dataKey="value"
              fill="var(--color-value)"
              radius={8}
              onClick={handleBarClick}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export default BarChart;
