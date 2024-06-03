import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { TLeaderBoardTitle } from "app/ecosystems/[ecosystemSlug]/features/leader-board-title/leader-board-title.types";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export async function LeaderBoardTitle({ ecosystemSlug }: TLeaderBoardTitle.Props) {
  const [hasContributionCount, hasTotalEarned] = await Promise.all([
    ecosystemsApiClient.fetch
      .getEcosystemContributorsBySlug(
        { ecosystemSlug },
        {
          sort: "CONTRIBUTION_COUNT",
        },
        {
          pageSize: 5,
          pageIndex: 0,
        }
      )
      .request({
        next: { revalidate: 120 },
      })
      .then(res => !!res.contributors.length),
    ecosystemsApiClient.fetch
      .getEcosystemContributorsBySlug(
        { ecosystemSlug },
        {
          sort: "TOTAL_EARNED",
        },
        {
          pageSize: 5,
          pageIndex: 0,
        }
      )
      .request({
        next: { revalidate: 120 },
      })
      .then(res => !!res.contributors.length),
  ]);

  if (!hasContributionCount && !hasTotalEarned) {
    throw new Error("No more contributors found");
  }
  return (
    <div className="flex items-baseline gap-2">
      <Icon remixName="ri-trophy-line" size={24} />
      <Typography variant="title-m" translate={{ token: "v2.pages.ecosystems.detail.leaderBoard.title" }} />
      <Typography
        variant="body-l"
        translate={{ token: "v2.pages.ecosystems.detail.leaderBoard.titleSpecialMention" }}
        className="text-spaceBlue-100"
      />
    </div>
  );
}
