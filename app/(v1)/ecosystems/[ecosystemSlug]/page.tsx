import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FeaturedProjects } from "app/(v1)/ecosystems/[ecosystemSlug]/features/featured-projects/featured-projects";
import { FeaturedProjectsLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/featured-projects/featured-projects.loading";
import { Languages } from "app/(v1)/ecosystems/[ecosystemSlug]/features/languages/languages";
import { LanguagesLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/languages/languages.loading";
import { LeaderBoardLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.loading";
import { LeaderBoardSection } from "app/(v1)/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.section";
import { LearnMore } from "app/(v1)/ecosystems/[ecosystemSlug]/features/learn-more/learn-more";
import { LearnMoreLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/learn-more/learn-more.loading";
import { MoreProjectLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/more-project/more-project.loading";
import { MoreProjectSection } from "app/(v1)/ecosystems/[ecosystemSlug]/features/more-project/more-project.section";
import { Overview } from "app/(v1)/ecosystems/[ecosystemSlug]/features/overview/overview";
import { ProjectGoodFirstIssues } from "app/(v1)/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues";
import { ProjectGoodFirstIssuesLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues.loading";
import { TopProjects } from "app/(v1)/ecosystems/[ecosystemSlug]/features/top-projects/top-projects";
import { TopProjectsLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/top-projects/top-projects.loading";

import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default async function EcosystemDetailPage({ params }: { params: { ecosystemSlug: string } }) {
  const { ecosystemSlug } = params;

  return (
    <ScrollView>
      <Container>
        <div className={"flex flex-col gap-8 py-10 lg:gap-10"}>
          <Overview ecosystemSlug={params.ecosystemSlug} />

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
      </Container>
    </ScrollView>
  );
}
