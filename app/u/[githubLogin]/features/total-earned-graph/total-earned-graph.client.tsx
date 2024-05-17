"use client";

import { Money } from "utils/Money/Money";

import { TTooltip } from "components/features/graphs/components/tooltip/tooltip.types";
import { PieChart } from "components/features/graphs/pie-chart/pie-chart";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

export async function TotalEarnedGraphClient({ data }: TTotalEarnedGraph.PropsClient) {
  function renderTooltip(tooltipData: TTooltip.DataProps) {
    return (
      <Flex className="gap-0.5">
        <Typography variant="body-s-bold">
          {
            Money.format({
              amount: tooltipData.value,
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
  }

  return (
    <PieChart
      data={data}
      renderTooltip={renderTooltip}
      pieProps={{
        width: 160,
        height: 160,
      }}
    />
  );
}
