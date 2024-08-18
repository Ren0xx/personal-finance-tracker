"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/trpc/react";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
type Transaction = RouterOutputs["transaction"]["getAll"][0];
type BarChartProps = {
  transactions: Transaction[];
};

const chartConfig = {
  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const formatData = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      const month = transaction.date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      let monthData = acc.find((item) => item.month === month);

      if (!monthData) {
        monthData = { month, income: 0, expense: 0 };
        acc.push(monthData);
      }

      if (Number(transaction.amount) >= 0) {
        monthData.income += Number(transaction.amount);
      } else {
        monthData.expense += Math.abs(Number(transaction.amount));
      }

      return acc;
    },
    [] as { month: string; income: number; expense: number }[],
  );
};

export function TransactionsBarChart({ transactions }: BarChartProps) {
  const chartData = formatData(transactions);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Transactions</CardTitle>
        <CardDescription>Incomes and Expenses Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <YAxis />
            <Legend />
            <Bar
              dataKey="income"
              fill="var(--color-incomes)"
              name="Incomes"
            ></Bar>
            <Bar
              dataKey="expense"
              fill="var(--color-expenses)"
              name="Expenses"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
