"use client";

import { Money } from "utils/Money/Money";

import { Card } from "components/ds/card/card";
import { TTooltip } from "components/features/graphs/components/tooltip/tooltip.types";
import { PieChart } from "components/features/graphs/pie-chart/pie-chart";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

export function TotalEarnedGraph(_: TTotalEarnedGraph.Props) {
  const data = [
    { id: "g-a", label: "Group A", value: 400 },
    { id: "g-b", label: "Group B", value: 300 },
    { id: "b-c", label: "Group C", value: 300 },
    { id: "g-d", label: "Group D", value: 200 },
  ];

  const renderTooltip = (data: TTooltip.DataProps) => {
    return (
      <Flex className="gap-0.5">
        <Typography variant="body-s-bold">
          {
            Money.format({
              amount: data.value,
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
    );
  };

  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.totalEarned" }} />

      <Card>
        <Flex direction="col" alignItems="center" className="gap-2">
          <PieChart
            data={data}
            renderTooltip={renderTooltip}
            pieProps={{
              width: 160,
              height: 160,
            }}
          />

          <Typography variant="title-l">
            {
              Money.format({
                amount: 221000,
                currency: Money.USD,
              }).string
            }
          </Typography>
        </Flex>
      </Card>
    </Flex>
  );
}
