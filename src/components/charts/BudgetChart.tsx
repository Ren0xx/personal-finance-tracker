"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "@/components/ui/card";
import styles from "@/styles/budgetChart.module.css";
import getCssVar from "@/utils/getCssVar";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartComponentProps {
  data: { label: string; value: number }[];
}

const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartData: ChartData<"bar"> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Sample Data",
        data: data.map((item) => item.value),
        backgroundColor: getCssVar("--accent"),
        borderColor: getCssVar("--border"),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Card className={styles.card}>
      <Bar data={chartData} options={chartOptions} />
    </Card>
  );
};

export default ChartComponent;
