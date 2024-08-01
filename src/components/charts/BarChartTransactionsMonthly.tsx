"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/trpc/react";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
type Transaction = RouterOutputs["transaction"]["getAll"][0];
type BarChartProps = {
  transactions: Transaction[];
};

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "hsl(var(--chart-1))",
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
        monthData = { month, income: 0, expense: 10 };
        acc.push(monthData);
      }

      if (Number(transaction.amount) >= 0) {
        monthData.income += Number(transaction.amount);
        //     monthData.expense += Math.abs(transaction.amount.toNumber());
        //   }
        //   } else {
      }
      return acc;
    },
    [] as { month: string; income: number; expense: number }[],
  );
};

export function TransactionsBarChart({ transactions }: BarChartProps) {
  const chartData = formatData(transactions);
  console.log(chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Transactions</CardTitle>
        <CardDescription>Income and Expenses Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Bar dataKey="income" fill="var(--color-income)" name="Income" />
            <Bar dataKey="expense" fill="var(--color-expense)" name="Expense" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <p>Income and Expenses for each month</p>
      </CardFooter>
    </Card>
  );
}
