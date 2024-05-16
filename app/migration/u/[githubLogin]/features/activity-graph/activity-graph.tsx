import { usersApiClient } from "api-client/resources/users";

import { Card } from "components/ds/card/card";
import { FiltersEcosystems } from "components/features/filters/filters-ecosystems/filters-ecosystems";
import { ActivityGraph as ActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph";
import { TActivityGraph as TActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDateFromWeekNumber } from "components/features/graphs/activity-graph/utils/getDateFromWeekNumber";
import { getLevelFromCount } from "components/features/graphs/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "components/features/graphs/activity-graph/utils/getLevelRange";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Typography } from "components/layout/typography/typography";

import { TActivityGraph } from "./activity-graph.types";

export async function ActivityGraph({ githubUserId }: TActivityGraph.Props) {
  const stats = await usersApiClient.fetch.getUserPublicStats(githubUserId).request({
    next: { revalidate: 120 },
  });
  function createData() {
    const data: TActivityGraphComponent.weeksData<unknown> = {};

    const levelRange = getLevelRange(
      stats?.activity?.map(activity => activity.issueCount + activity.codeReviewCount + activity.pullRequestCount) || []
    );

    stats?.activity?.forEach(activity => {
      const contributionCount = activity.issueCount + activity.codeReviewCount + activity.pullRequestCount;
      data[getWeekId(getDateFromWeekNumber(activity.year, activity.week))] = {
        level: getLevelFromCount(levelRange, contributionCount),
        icon: activity.rewardCount > 0 ? { remixName: "ri-medal-2-fill" } : undefined,
        tooltipContent: `${contributionCount} contributions • ${activity.rewardCount} rewards`,
      };
    });

    return data;
  }

  const weekData = createData();

  async function onFilterChange() {
    "use server";
    console.log("onChange");
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between gap-1">
        <Typography
          variant="title-m"
          className="flex-1"
          translate={{ token: "v2.pages.publicProfile.activity.title" }}
        />
        <FiltersEcosystems
          selected={[]}
          ecosystems={[]}
          onChange={onFilterChange}
          hideLabel={true}
          hideIcon={true}
          isBlueBackground={true}
        />
      </div>
      <Card background={"base"} className="flex flex-row items-center justify-center">
        <ActivityGraphComponent weekData={weekData} />
      </Card>
    </div>
  );
}
