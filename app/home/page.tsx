import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { PageGrid } from "app/home/components/page-grid/page-grid";
import { Activity } from "app/home/features/activity/activity";
import { ActivityLoading } from "app/home/features/activity/activity.loading";
import { JourneyLoading } from "app/home/features/journey/journey.loading";
import { JourneyPrivate } from "app/home/features/journey/journey.private";
import { JourneyPublic } from "app/home/features/journey/journey.public";
import { LeadProjects } from "app/home/features/lead-projects/lead-projects";
import { LeadProjectsLoading } from "app/home/features/lead-projects/lead-projects.loading";
import { Profile } from "app/home/features/profile/profile";
import { RecommendedProjects } from "app/home/features/recommended-projects/recommended-projects";
import { RecommendedProjectsLoading } from "app/home/features/recommended-projects/recommended-projects.loading";
import { Rewards } from "app/home/features/rewards/rewards";
import { RewardsLoading } from "app/home/features/rewards/rewards.loading";
import { TrendyProjects } from "app/home/features/trendy-projects/trendy-projects";
import { TrendyProjectsLoading } from "app/home/features/trendy-projects/trendy-projects.loading";

import { RequiredAuthGuard, RequiredUnauthGuard } from "components/features/auth0/guards/auth-guard";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default function HomePage() {
  return (
    <ScrollView>
      <Container>
        <PosthogOnMount eventName={"home_dashboard_viewed"} />
        <PageGrid>
          <RequiredAuthGuard>
            <Profile />
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<JourneyLoading />}>
                <JourneyPrivate />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<RewardsLoading />}>
                <Rewards />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<LeadProjectsLoading />}>
                <LeadProjects />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<RecommendedProjectsLoading />}>
                <RecommendedProjects />
              </Suspense>
            </ErrorBoundary>
          </RequiredAuthGuard>

          <RequiredUnauthGuard>
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<JourneyLoading />}>
                <JourneyPublic />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<TrendyProjectsLoading />}>
                <TrendyProjects />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={null}>
              <Suspense fallback={<ActivityLoading />}>
                <Activity />
              </Suspense>
            </ErrorBoundary>
          </RequiredUnauthGuard>
        </PageGrid>
      </Container>
    </ScrollView>
  );
}
