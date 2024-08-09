"use client";

import {
  RadialBar,
  RadialBarChart,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { daysUntil } from "@/utils/dateFormat";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/trpc/react";
import Link from "next/link";

type SavingsGoalAll = RouterOutputs["savingsGoal"]["getAll"][0];
type SavingsGoalOne = RouterOutputs["savingsGoal"]["getOne"];
type SavingsGoalCardProps = {
  savingsGoal: SavingsGoalAll | SavingsGoalOne;
};

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
} satisfies ChartConfig;

const SavingsGoalCard = ({ savingsGoal }: SavingsGoalCardProps) => {
  const { name, targetAmount, currentAmount, deadline } = savingsGoal;

  const target = Number(targetAmount);
  const current = Number(currentAmount);
  const percentageAchieved = (current / target) * 100;
  const daysLeft = daysUntil(deadline ?? new Date());

  const chartData = [
    {
      name: "Achieved",
      value: percentageAchieved,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Remaining",
      value: 100 - percentageAchieved,
      fill: "hsl(var(--ring))", 
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Goal:
          <Link href={`/savings-goals/${name}`} prefetch={true}>
            {name}
          </Link>
        </CardTitle>
        <CardDescription>Progress towards your goal</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {percentageAchieved.toFixed(2)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Achieved
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <CardFooter
          className={`justify-center ${daysLeft >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {daysLeft >= 0
            ? `Time left: ${daysLeft} days`
            : `Deadline passed: ${Math.abs(daysLeft)} days ago`}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalCard;
