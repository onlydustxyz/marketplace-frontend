import { usersApiClient } from "api-client/resources/users";
import { Suspense, useMemo } from "react";

import { TotalEarnedGraphClient } from "app/u/[githubLogin]/features/total-earned-graph/total-earned-graph.client";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTotalEarned } from "./total-earned.types";

const SHOWED_STATS_NUMBER = 4;
export function TotalEarned({ githubId }: TTotalEarned.Props) {
  const { data: stats } = usersApiClient.queries.useGetUserPublicStatsByGithubId(githubId, undefined, {
    retry: 0,
  });

  const data = useMemo(() => {
    const orderedStats = (stats?.earnings?.perProject || []).sort((a, b) => b.totalEarnedUsd - a.totalEarnedUsd);
    const mainStats = orderedStats.slice(0, SHOWED_STATS_NUMBER);
    const otherStats = orderedStats.slice(SHOWED_STATS_NUMBER);

    const data = mainStats.map(earning => ({
      id: earning.projectName,
      label: earning.projectName,
      value: earning.totalEarnedUsd,
    }));

    if (!mainStats.length) {
      return [];
    }

    const otherData = {
      id: "other",
      // because it's server we can't use translate hook here
      label: "Other",
      value: otherStats.reduce((acc, curr) => acc + curr.totalEarnedUsd, 0),
    };

    return [...data, otherData];
  }, [stats]);

  const Graph = useMemo(() => {
    return <TotalEarnedGraphClient data={data} />;
  }, [data]);

  if (!data.length) {
    return null;
  }

  return (
    <Flex direction="col" className="flex-1 gap-3">
      <Card background={"light"} border={"light"} className={"flex h-full flex-1 flex-col gap-3"}>
        <Typography
          translate={{ token: "v2.pages.project.details.applicationDetails.profile.stats.rewarded" }}
          variant="special-label"
          className="text-greyscale-200"
        />
        <div className="flex w-full flex-1 flex-col justify-center">
          <Suspense>{Graph}</Suspense>
        </div>
      </Card>
    </Flex>
  );
}
