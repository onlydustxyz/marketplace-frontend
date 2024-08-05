import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { LeaderBoard } from "app/(v1)/ecosystems/[ecosystemSlug]/features/leader-board/leader-board";
import { TLeaderBoard } from "app/(v1)/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.types";

import { Section } from "components/layout/section/section";

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

  if (contributorsByCount?.length < 5 && contributorsByTotalEarned?.length < 5) return null;

  return (
    <Section
      iconProps={{ remixName: "ri-trophy-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.leaderBoard.title" } }}
      subtitleProps={{ translate: { token: "v2.pages.ecosystems.detail.leaderBoard.titleSpecialMention" } }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {contributorsByCount.length === 5 ? (
          <LeaderBoard sortBy={"CONTRIBUTION_COUNT"} contributors={contributorsByCount} className={className} />
        ) : null}
        {contributorsByTotalEarned.length === 5 ? (
          <LeaderBoard sortBy={"TOTAL_EARNED"} contributors={contributorsByTotalEarned} className={className} />
        ) : null}
      </div>
    </Section>
  );
}
