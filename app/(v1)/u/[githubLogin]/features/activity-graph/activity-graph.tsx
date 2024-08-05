"use client";

import { usersApiClient } from "api-client/resources/users";
import { useMemo, useState } from "react";

import { ActivityGraphError } from "app/(v1)/u/[githubLogin]/features/activity-graph/activity-graph.error";
import { Filter } from "app/(v1)/u/[githubLogin]/features/activity-graph/filter/filter";

import { Card } from "components/ds/card/card";
import { ActivityGraph as ActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph";
import { TActivityGraph as TActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDateFromWeekNumber } from "components/features/graphs/activity-graph/utils/getDateFromWeekNumber";
import { getLevelFromCount } from "components/features/graphs/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "components/features/graphs/activity-graph/utils/getLevelRange";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Typography } from "components/layout/typography/typography";

import { TActivityGraph } from "./activity-graph.types";

export function ActivityGraph({ githubUserId, ecosystems, activityGraphOnly }: TActivityGraph.Props) {
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<string | undefined>(undefined);
  const { data, isLoading, isRefetching, isError } = usersApiClient.queries.useGetUserPublicStatsByGithubId(
    githubUserId,
    selectedEcosystemId,
    { retry: 0 }
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

  const renderContent = useMemo(() => {
    if (!weekData || isError) {
      return <ActivityGraphError />;
    }

    // temporary fix for render only the activity graph in the good first issue section
    if (activityGraphOnly) {
      return <ActivityGraphComponent weekData={weekData} isLoading={isLoading || isRefetching} />;
    }

    return (
      <>
        <div className="flex w-full flex-row items-center justify-between gap-10 sm:gap-2">
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
      </>
    );
  }, [weekData, isLoading, isRefetching, isError]);

  return <div className="flex w-full flex-col gap-4">{renderContent}</div>;
}
