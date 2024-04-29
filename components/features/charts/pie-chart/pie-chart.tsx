"use client";

import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Money } from "utils/Money/Money";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { CustomLegend } from "../custom-legend/custom-legend";
import { CustomTooltip } from "../custom-tooltip/custom-tooltip";
import { TPieChart } from "./pie-chart.types";

// TODO: Active shape, regarder pour avoir une transition animée
// TODO: Check responsive widht and height
// TODO: Check spacing between chart and legend
// TODO: Render tooltip custom -> externalisé la logique avec différent tooltip et penser en props le tooltips qu'on veut (default, money, etc.)
// Appeler le custom tooltip qui lui render l'un ou l'autre et passer les différents tooltip dans des dossiers à sa racine + un fichier pour le header
// TODO: Check for types for customLegend and customTooltip
export function PieChart({ data }: TPieChart.Props) {
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
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={52}
          outerRadius={70}
          stroke="none"
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => {
            const color = entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

            return <Cell key={`cell-${index}`} fill={color} className="outline-none" />;
          })}
        </Pie>

        <Legend layout="vertical" verticalAlign="middle" align="right" content={<CustomLegend />} />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload}>
              {payload?.length ? (
                <Flex className="gap-0.5">
                  <Typography variant="body-s-bold">
                    {
                      Money.format({
                        amount: Number(payload[0].value),
                        currency: Money.USD,
                        options: {
                          showCurrency: false,
                        },
                      }).string
                    }
                  </Typography>

                  <Typography
                    variant="body-xs"
                    translate={{
                      token: "v2.pages.publicProfile.header.usd",
                    }}
                    className="text-spaceBlue-100"
                  />
                </Flex>
              ) : null}
            </CustomTooltip>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
