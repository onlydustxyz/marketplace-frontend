import { Suspense } from "react";

import { LeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board";
import { Overview } from "app/ecosystems/[ecosystemSlug]/features/overview/overview";
import { OverviewLoading } from "app/ecosystems/[ecosystemSlug]/features/overview/overview.loading";
import { ProjectGoodFirstIssues } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues";

import { Button } from "components/ds/button/button";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { BaseLink } from "components/layout/base-link/base-link";
import { Container } from "components/layout/container/container";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export default async function EcosystemDetailPage({ params }: { params: { ecosystemSlug: string } }) {
  return (
    <div className={"grid gap-8 py-10 lg:gap-10"}>
      <div>
        <Container>
          <div className={"flex flex-col items-start gap-4"}>
            <BaseLink href={NEXT_ROUTER.ecosystems.root}>
              <Button as={"div"} variant={"secondary"} size={"s"} iconOnly>
                <Icon remixName={"ri-arrow-left-s-line"} size={16} />
              </Button>
            </BaseLink>

            <Suspense fallback={<OverviewLoading />}>
              <Overview ecosystemSlug={params.ecosystemSlug} />
            </Suspense>
          </div>
        </Container>
      </div>
      <ProjectGoodFirstIssues />

      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <Icon remixName="ri-trophy-line" size={24} />
            <Typography variant="title-m" translate={{ token: "v2.pages.ecosystems.detail.leaderBoard.title" }} />
            <Typography
              variant="body-l"
              translate={{ token: "v2.pages.ecosystems.detail.leaderBoard.titleSpecialMention" }}
              className="text-spaceBlue-100"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
              <LeaderBoard sortBy={"CONTRIBUTION_COUNT"} ecosystemSlug={params.ecosystemSlug} />
            </Suspense>
            <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
              <LeaderBoard sortBy={"TOTAL_EARNED"} ecosystemSlug={params.ecosystemSlug} />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
