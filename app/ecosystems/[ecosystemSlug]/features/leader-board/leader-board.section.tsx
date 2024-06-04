import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board";
import { TLeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.types";
import { Section } from "app/ecosystems/components/section/section";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

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
      .request({
        next: { revalidate: 120 },
      })
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
      .request({
        next: { revalidate: 120 },
      })
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
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
            <LeaderBoard sortBy={"CONTRIBUTION_COUNT"} contributors={contributorsByCount} className={className} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
            <LeaderBoard sortBy={"TOTAL_EARNED"} contributors={contributorsByTotalEarned} className={className} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Section>
  );
}
