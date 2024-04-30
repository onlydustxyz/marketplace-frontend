"use client";

import { Money } from "utils/Money/Money";

import { Card } from "components/ds/card/card";
import { TCustomTooltip } from "components/features/charts/custom-tooltip/custom-tooltip.types";
import { PieChart } from "components/features/charts/pie-chart/pie-chart";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

export function TotalEarnedGraph(_: TTotalEarnedGraph.Props) {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const renderTooltip = (payload: TCustomTooltip.CustomPayload) => {
    return (
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
    );
  };

  return (
    <Card>
      <PieChart data={data} renderTooltip={renderTooltip} />
    </Card>
  );
}
