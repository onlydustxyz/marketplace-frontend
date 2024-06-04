import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { LeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board";
import { TLeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.types";
import { Section } from "app/ecosystems/components/section/section";

export async function LeaderBoardSection({ ecosystemSlug, className }: TLeaderBoard.LeaderBoardSectionProps) {
  const [contributorsByCount, contributorsByTotalEarned] = await Promise.all([
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
      .request()
      .then(res => res.contributors),
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
      .request()
      .then(res => res.contributors),
  ]);

  if (!contributorsByCount?.length && !contributorsByTotalEarned?.length) return null;

  return (
    <Section
      iconProps={{ remixName: "ri-trophy-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.leaderBoard.title" } }}
      subtitleProps={{ translate: { token: "v2.pages.ecosystems.detail.leaderBoard.titleSpecialMention" } }}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <LeaderBoard sortBy={"CONTRIBUTION_COUNT"} contributors={contributorsByCount} className={className} />
        <LeaderBoard sortBy={"TOTAL_EARNED"} contributors={contributorsByTotalEarned} className={className} />
      </div>
    </Section>
  );
}
