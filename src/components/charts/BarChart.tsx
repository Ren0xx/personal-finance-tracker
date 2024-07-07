"use client";
import { useEffect, useState } from "react";
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { lightTheme, darkTheme } from "@/styles/theme";
import { useTheme } from "next-themes";
import CustomTooltip from "./CustomTootlip";

type BarChartProps = {
  data: Array<{ label: string; value: number }>;
};

const BarChart = (props: BarChartProps) => {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState(lightTheme);

  useEffect(() => {
    const updateColors = () => {
      if (resolvedTheme === "dark") {
        setColors(darkTheme);
      } else {
        setColors(lightTheme);
      }
    };

    updateColors();
  }, [resolvedTheme]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <Chart data={props.data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill={`hsla(${colors.primary})`} />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
