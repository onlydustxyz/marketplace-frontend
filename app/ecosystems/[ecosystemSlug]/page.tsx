import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board";
import { MoreProject } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project";
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
    <div className="scrollbar-sm my-auto flex w-full items-start justify-center">
      <div className={"grid gap-8 py-10 lg:gap-10"}>
        <div>
          <Container>
            <div className={"flex items-center gap-4"}>
              <BaseLink href={NEXT_ROUTER.ecosystems.root}>
                <Button as={"div"} variant={"secondary"} size={"s"} iconOnly>
                  <Icon remixName={"ri-arrow-left-s-line"} size={16} />
                </Button>
              </BaseLink>

              <Typography variant={"title-l"} className={"lg:hidden"}>
                PROJECT NAME
              </Typography>
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
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
                  <LeaderBoard sortBy={"CONTRIBUTION_COUNT"} ecosystemSlug={params.ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
                  <LeaderBoard sortBy={"TOTAL_EARNED"} ecosystemSlug={params.ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2">
              <Icon remixName="ri-folder-3-line" size={24} />
              <Typography variant="title-m" translate={{ token: "v2.pages.ecosystems.detail.moreProjects.title" }} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
                  <MoreProject tag={"NEWBIES_WELCOME"} ecosystemSlug={params.ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
                  <MoreProject tag={"HOT_COMMUNITY"} ecosystemSlug={params.ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
                  <MoreProject tag={"FAST_AND_FURIOUS"} ecosystemSlug={params.ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
