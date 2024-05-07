"use client";

import { Pie } from "@nivo/pie";
import { useState } from "react";

import { Flex } from "components/layout/flex/flex";

import { Legend } from "../components/legend/legend";
import { Tooltip } from "../components/tooltip/tooltip";
import { TPieChart } from "./pie-chart.types";

export function PieChart({ data }: TPieChart.Props) {
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const DEFAULT_COLORS = ["#FFBC66", "#CE66FF", "#666BD7", "#66FFEF", "#F69EF3"];

  const legendData = data.map(item => {
    return {
      id: item.id,
      label: item.label,
      value: item.value,
      color: DEFAULT_COLORS[data.indexOf(item)],
    };
  });

  return (
    <Flex alignItems="center" justifyContent="center" width="full" className="gap-1">
      <Pie
        data={data}
        width={160}
        height={160}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        innerRadius={0.75}
        colors={DEFAULT_COLORS}
        activeOuterRadiusOffset={3}
        activeInnerRadiusOffset={3}
        layers={["arcs"]}
        tooltip={({ datum }) => <Tooltip data={datum} />}
        activeId={activeId}
        onActiveIdChange={setActiveId}
      />

      <Legend data={legendData} setActiveId={setActiveId} />
    </Flex>
  );
}
