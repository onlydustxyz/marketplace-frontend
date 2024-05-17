"use client";

import { usersApiClient } from "api-client/resources/users";
import { useMemo, useState } from "react";

import { Filter } from "app/u/[githubLogin]/features/activity-graph/filter/filter";

import { Card } from "components/ds/card/card";
import { ActivityGraph as ActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph";
import { TActivityGraph as TActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDateFromWeekNumber } from "components/features/graphs/activity-graph/utils/getDateFromWeekNumber";
import { getLevelFromCount } from "components/features/graphs/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "components/features/graphs/activity-graph/utils/getLevelRange";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Typography } from "components/layout/typography/typography";

import { TActivityGraph } from "./activity-graph.types";

export function ActivityGraph({ githubUserId, ecosystems }: TActivityGraph.Props) {
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<string | undefined>(undefined);
  const { data, isLoading, isRefetching } = usersApiClient.queries.useGetUserPublicStatsByGithubId(
    githubUserId,
    selectedEcosystemId
  );

  const weekData = useMemo(() => {
    const _weekData: TActivityGraphComponent.weeksData<unknown> = {};

    const levelRange = getLevelRange(
      data?.activity?.map(activity => activity.issueCount + activity.codeReviewCount + activity.pullRequestCount) || []
    );

    data?.activity.forEach(activity => {
      const contributionCount = activity.issueCount + activity.codeReviewCount + activity.pullRequestCount;
      _weekData[getWeekId(getDateFromWeekNumber(activity.year, activity.week))] = {
        level: getLevelFromCount(levelRange, contributionCount),
        icon: activity.rewardCount > 0 ? { remixName: "ri-medal-2-fill" } : undefined,
        tooltipContent: `${contributionCount} contributions • ${activity.rewardCount} rewards`,
      };
    });

    return _weekData;
  }, [data]);

  function onEcosystemChange(ecosystemId: string | undefined) {
    setSelectedEcosystemId(ecosystemId);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between gap-1">
        <Typography
          variant="title-m"
          className="flex-1"
          translate={{ token: "v2.pages.publicProfile.activity.title" }}
        />
        <Filter ecosystems={ecosystems} onChange={onEcosystemChange} value={selectedEcosystemId} />
      </div>
      <Card background={"base"} className="flex flex-row items-center justify-center">
        <ActivityGraphComponent weekData={weekData} isLoading={isLoading || isRefetching} />
      </Card>
    </div>
  );
}
