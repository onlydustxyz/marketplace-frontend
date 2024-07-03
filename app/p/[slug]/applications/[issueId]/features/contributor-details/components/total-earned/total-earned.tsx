import { usersApiClient } from "api-client/resources/users";
import Image from "next/image";
import { Suspense, useMemo } from "react";

import { TotalEarnedGraphClient } from "app/u/[githubLogin]/features/total-earned-graph/total-earned-graph.client";

import { IMAGES } from "src/assets/img";

import { Typo } from "components/atoms/typo";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import { TTotalEarned } from "./total-earned.types";

const SHOWED_STATS_NUMBER = 4;

export function TotalEarned({ githubId }: TTotalEarned.Props) {
  const { T } = useIntl();
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

  function renderEmpty() {
    return (
      <div className={"grid gap-3"}>
        <Image
          src={IMAGES.global.categories}
          width={45}
          height={45}
          alt={T("v2.pages.project.details.applicationDetails.profile.stats.rewarded.title")}
        />

        <Typo
          variant={"brand"}
          size={"m"}
          translate={{ token: "v2.pages.project.details.applicationDetails.profile.stats.rewarded.empty.title" }}
        />

        <Typo
          size={"xs"}
          color={"text-2"}
          translate={{ token: "v2.pages.project.details.applicationDetails.profile.stats.rewarded.empty.message" }}
        />
      </div>
    );
  }

  return (
    <Flex direction="col" className="flex-1 gap-3">
      <Card background={"light"} border={"light"} className={"flex h-full flex-1 flex-col gap-3"}>
        <Typography
          translate={{ token: "v2.pages.project.details.applicationDetails.profile.stats.rewarded.title" }}
          variant="special-label"
          className="text-greyscale-200"
        />
        {data.length ? (
          <div className="flex w-full flex-1 flex-col justify-center">
            <Suspense>{Graph}</Suspense>
          </div>
        ) : (
          renderEmpty()
        )}
      </Card>
    </Flex>
  );
}
