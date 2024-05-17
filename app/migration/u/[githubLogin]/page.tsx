import { usersApiClient } from "api-client/resources/users";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ActivityGraph } from "app/migration/u/[githubLogin]/features/activity-graph/activity-graph";
import { ActivityGraphError } from "app/migration/u/[githubLogin]/features/activity-graph/activity-graph.error";
import { EcosystemsSection } from "app/migration/u/[githubLogin]/features/ecosystems-section/ecosystems-section";
import { EcosystemsSectionLoading } from "app/migration/u/[githubLogin]/features/ecosystems-section/ecosystems-section.loading";
import { LanguagesSection } from "app/migration/u/[githubLogin]/features/languages-section/languages-section";
import { LanguagesSectionLoading } from "app/migration/u/[githubLogin]/features/languages-section/languages-section.loading";
import { ProfileOverviewLoading } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.loading";
import { TotalEarnedGraph } from "app/migration/u/[githubLogin]/features/total-earned-graph/total-earned-graph";
import { TotalEarnedGraphError } from "app/migration/u/[githubLogin]/features/total-earned-graph/total-earned-graph.error";
import { TotalEarnedGraphLoading } from "app/migration/u/[githubLogin]/features/total-earned-graph/total-earned-graph.loading";
import { WorkDistributionGraph } from "app/migration/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph";
import { WorkDistributionGraphError } from "app/migration/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph.error";
import { WorkDistributionGraphLoading } from "app/migration/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph.loading";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";

import { ProfileOverview } from "./features/profile-overview/profile-overview";

export default async function PublicProfilePage({ params }: { params: { githubLogin: string } }) {
  const userProfile = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(params.githubLogin).request({
    next: { revalidate: 120 },
  });
  const ecosystems = (userProfile?.ecosystems || []).map(ecosystem => ({
    name: ecosystem.name,
    logoUrl: ecosystem.logoUrl,
    id: ecosystem.id,
  }));
  return (
    <>
      <PosthogOnMount
        eventName={"contributor_viewed"}
        params={{ id: userProfile.id, type: "full" }}
        paramsReady={Boolean(userProfile.id)}
      />
      <div className="flex w-full flex-col items-start justify-start gap-10">
        <Suspense fallback={<ProfileOverviewLoading />}>
          <ProfileOverview userProfile={userProfile} />
        </Suspense>
        <div className="flex w-full flex-col items-start justify-start gap-10 xl:flex-row xl:gap-6">
          <div className="grid w-full gap-10 xl:flex-1">
            <Suspense fallback={<LanguagesSectionLoading />}>
              <LanguagesSection githubUserId={userProfile.githubUserId} />
            </Suspense>
            <Suspense fallback={<EcosystemsSectionLoading />}>
              <EcosystemsSection githubUserId={userProfile.githubUserId} />
            </Suspense>
          </div>
          <div className="grid w-full gap-x-6 gap-y-10 md:grid-cols-2 xl:w-1/3 xl:grid-cols-1 xl:gap-6">
            <ErrorBoundary fallback={<ActivityGraphError />}>
              <ActivityGraph githubUserId={userProfile.githubUserId} ecosystems={ecosystems} />
            </ErrorBoundary>

            <ErrorBoundary fallback={<TotalEarnedGraphError />}>
              <Suspense fallback={<TotalEarnedGraphLoading />}>
                <TotalEarnedGraph githubUserId={userProfile.githubUserId} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<WorkDistributionGraphError />}>
              <Suspense fallback={<WorkDistributionGraphLoading />}>
                <WorkDistributionGraph githubUserId={userProfile.githubUserId} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
}
