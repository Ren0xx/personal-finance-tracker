import { type TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload?.length) {
    return (
      <div className="p-2 bg-white dark:bg-gray-800 rounded shadow-md text-black dark:text-white">
        <p className="mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-sm">{`${item.name}: ${item.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;