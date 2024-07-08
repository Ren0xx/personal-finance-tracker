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

function BarChart({ data }: BarChartComponentProps) {
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
            <Bar dataKey="value" fill="var(--color-value)" radius={8}>
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
