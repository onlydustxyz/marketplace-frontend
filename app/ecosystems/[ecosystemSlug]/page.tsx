import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board";
import { LearnMore } from "app/ecosystems/[ecosystemSlug]/features/learn-more/learn-more";
import { LearnMoreLoading } from "app/ecosystems/[ecosystemSlug]/features/learn-more/learn-more.loading";
import { MoreProjectTitle } from "app/ecosystems/[ecosystemSlug]/features/more-project-title/more-project-title";
import { MoreProject } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project";
import { Overview } from "app/ecosystems/[ecosystemSlug]/features/overview/overview";
import { OverviewLoading } from "app/ecosystems/[ecosystemSlug]/features/overview/overview.loading";
import { ProjectGoodFirstIssues } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues";
import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import { Button } from "components/ds/button/button";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { BaseLink } from "components/layout/base-link/base-link";
import { Container } from "components/layout/container/container";
import { Icon } from "components/layout/icon/icon";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export default async function EcosystemDetailPage({ params }: { params: { ecosystemSlug: string } }) {
  const { ecosystemSlug } = params;

  return (
    <ScrollView>
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
        <Suspense
          fallback={
            <SectionLoading>
              <SkeletonEl width="100%" height="224px" variant="rounded" />
            </SectionLoading>
          }
        >
          <ProjectGoodFirstIssues ecosystemSlug={ecosystemSlug} />
        </Suspense>

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
                  <LeaderBoard sortBy={"CONTRIBUTION_COUNT"} ecosystemSlug={ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<SkeletonEl width="100%" height="466px" variant="rounded" />}>
                  <LeaderBoard sortBy={"TOTAL_EARNED"} ecosystemSlug={ecosystemSlug} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </Container>

        <ErrorBoundary fallback={null}>
          <Container>
            <div className="flex flex-col gap-4">
              <Suspense fallback={<SkeletonEl width="100px" height="18px" variant="text" />}>
                <MoreProjectTitle ecosystemSlug={params.ecosystemSlug} />
              </Suspense>

              <div className="flex gap-4">
                <ErrorBoundary fallback={null}>
                  <Suspense fallback={<SkeletonEl width="400px" height="466px" variant="rounded" />}>
                    <MoreProject tag={"NEWBIES_WELCOME"} ecosystemSlug={params.ecosystemSlug} />
                  </Suspense>
                </ErrorBoundary>
                <ErrorBoundary fallback={null}>
                  <Suspense fallback={<SkeletonEl width="400px" height="466px" variant="rounded" />}>
                    <MoreProject tag={"HOT_COMMUNITY"} ecosystemSlug={params.ecosystemSlug} />
                  </Suspense>
                </ErrorBoundary>
                <ErrorBoundary fallback={null}>
                  <Suspense fallback={<SkeletonEl width="400px" height="466px" variant="rounded" />}>
                    <MoreProject tag={"FAST_AND_FURIOUS"} ecosystemSlug={params.ecosystemSlug} />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </Container>
        </ErrorBoundary>
        <Suspense fallback={<LearnMoreLoading />}>
          <LearnMore ecosystemSlug={ecosystemSlug} />
        </Suspense>
      </div>
    </ScrollView>
  );
}
