"use client";

import { Cell, Pie, PieChart as RechartsPieChart } from "recharts";

import { TPieChart } from "./pie-chart.types";

export function PieChart(_: TPieChart.Props) {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <RechartsPieChart width={800} height={400}>
      <Pie data={data} cx={120} cy={200} innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </RechartsPieChart>
  );
}
