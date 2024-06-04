import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FeaturedProjects } from "app/ecosystems/[ecosystemSlug]/features/featured-projects/featured-projects";
import { FeaturedProjectsLoading } from "app/ecosystems/[ecosystemSlug]/features/featured-projects/featured-projects.loading";
import { Languages } from "app/ecosystems/[ecosystemSlug]/features/languages/languages";
import { LanguagesLoading } from "app/ecosystems/[ecosystemSlug]/features/languages/languages.loading";
import { LeaderBoardLoading } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.loading";
import { LeaderBoardSection } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.section";
import { LearnMore } from "app/ecosystems/[ecosystemSlug]/features/learn-more/learn-more";
import { LearnMoreLoading } from "app/ecosystems/[ecosystemSlug]/features/learn-more/learn-more.loading";
import { MoreProjectLoading } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project.loading";
import { MoreProjectSection } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project.section";
import { Overview } from "app/ecosystems/[ecosystemSlug]/features/overview/overview";
import { OverviewLoading } from "app/ecosystems/[ecosystemSlug]/features/overview/overview.loading";
import { ProjectGoodFirstIssues } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues";
import { ProjectGoodFirstIssuesLoading } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues.loading";
import { TopProjects } from "app/ecosystems/[ecosystemSlug]/features/top-projects/top-projects";
import { TopProjectsLoading } from "app/ecosystems/[ecosystemSlug]/features/top-projects/top-projects.loading";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Container } from "components/layout/container/container";
import { Icon } from "components/layout/icon/icon";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

import { NEXT_ROUTER } from "constants/router";

export default async function EcosystemDetailPage({ params }: { params: { ecosystemSlug: string } }) {
  const { ecosystemSlug } = params;

  return (
    <ScrollView>
      <div className={"grid gap-8 py-10 lg:gap-10"}>
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

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<ProjectGoodFirstIssuesLoading />}>
            <ProjectGoodFirstIssues ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<LanguagesLoading />}>
            <Languages ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<FeaturedProjectsLoading />}>
            <FeaturedProjects ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<LeaderBoardLoading />}>
            <LeaderBoardSection ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<MoreProjectLoading />}>
            <MoreProjectSection ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<TopProjectsLoading />}>
            <TopProjects ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<LearnMoreLoading />}>
            <LearnMore ecosystemSlug={ecosystemSlug} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollView>
  );
}
