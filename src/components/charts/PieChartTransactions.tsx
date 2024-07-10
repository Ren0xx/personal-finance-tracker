"use client";
import { useMemo } from "react";
import { Label, Pie, PieChart as Chart, Tooltip } from "recharts";
import { type RouterOutputs } from "@/trpc/react";
type Transaction = RouterOutputs["transaction"]["getAll"][0];
import { groupBy, map, sumBy } from "lodash";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

type PieChartProps = {
  transactions: Transaction[];
};

const chartConfig = {
  transactions: {
    label: "Transactions",
  },
} satisfies ChartConfig;

const getColor = (index: number) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];
  return colors[index % colors.length];
};

function PieChartTransactions({ transactions }: PieChartProps) {
  const data = useMemo(() => {
    const grouped = groupBy(
      transactions,
      (transaction) => transaction.category.name,
    );
    return map(grouped, (items, category) => ({
      category,
      amount: sumBy(items, (item) => Number(item.amount)),
    })).map((item, index) => ({
      ...item,
      fill: getColor(index),
    }));
  }, [transactions]);

  const totalAmount = useMemo(() => {
    return sumBy(data, "amount");
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Transactions by Category</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <Chart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Money spend
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export default PieChartTransactions;
