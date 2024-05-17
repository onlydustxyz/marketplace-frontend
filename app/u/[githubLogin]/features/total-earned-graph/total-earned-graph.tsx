import { usersApiClient } from "api-client/resources/users";
import { Money } from "utils/Money/Money";

import { TotalEarnedGraphClient } from "app/u/[githubLogin]/features/total-earned-graph/total-earned-graph.client";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

const SHOWED_STATS_NUMBER = 4;
export async function TotalEarnedGraph({ githubUserId }: TTotalEarnedGraph.Props) {
  const stats = await usersApiClient.fetch.getUserPublicStats(githubUserId).request({
    next: { revalidate: 120 },
  });
  const orderedStats = (stats?.earnings?.perProject || []).sort((a, b) => b.totalEarnedUsd - a.totalEarnedUsd);
  const mainStats = orderedStats.slice(0, SHOWED_STATS_NUMBER);
  const otherStats = orderedStats.slice(SHOWED_STATS_NUMBER);

  const data = mainStats.map(earning => ({
    id: earning.projectName,
    label: earning.projectName,
    value: earning.totalEarnedUsd,
  }));

  const otherData = {
    id: "other",
    // because it's server we can't use translate hook here
    label: "Other",
    value: otherStats.reduce((acc, curr) => acc + curr.totalEarnedUsd, 0),
  };

  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.totalEarned.title" }} />

      <Card background={"base"}>
        <Flex direction="col" alignItems="center" className="gap-2">
          <TotalEarnedGraphClient data={[...data, otherData]} />

          <Typography variant="title-l">
            {
              Money.format({
                amount: stats?.earnings?.totalEarnedUsd || 0,
                currency: Money.USD,
              }).string
            }
          </Typography>
        </Flex>
      </Card>
    </Flex>
  );
}
