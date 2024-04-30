"use client";

import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { CustomLegend } from "../custom-legend/custom-legend";
import { CustomTooltip } from "../custom-tooltip/custom-tooltip";
import { TPieChart } from "./pie-chart.types";

// TODO: Active shape, regarder pour avoir une transition animée
export function PieChart({ data, renderTooltip }: TPieChart.Props) {
  const DEFAULT_COLORS = ["#FFBC66", "#CE66FF", "#666BD7", "#66FFEF", "#F69EF3"];

  function renderActiveShape({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }: PieSectorDataItem) {
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={Number(innerRadius) - 3}
        outerRadius={Number(outerRadius) + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={148} className="px-12">
      <RechartsPieChart className="[&_.recharts-layer.recharts-pie-sector]:outline-none">
        <Pie
          data={data}
          dataKey="value"
          innerRadius={52}
          outerRadius={70}
          stroke="none"
          cx={74}
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => {
            const color = entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Pie>

        <Legend layout="vertical" verticalAlign="middle" align="right" content={<CustomLegend />} />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} renderTooltip={renderTooltip} />
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
