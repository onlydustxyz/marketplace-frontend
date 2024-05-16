import { usersApiClient } from "api-client/resources/users";
import { Suspense } from "react";

import { ActivityGraph } from "app/migration/u/[githubLogin]/features/activity-graph/activity-graph";
import { ActivityGraphLoading } from "app/migration/u/[githubLogin]/features/activity-graph/activity-graph.loading";
import { EcosystemsSection } from "app/migration/u/[githubLogin]/features/ecosystems-section/ecosystems-section";
import { LanguagesSection } from "app/migration/u/[githubLogin]/features/languages-section/languages-section";
import { ProfileOverviewLoading } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.loading";
import { TotalEarnedGraph } from "app/migration/u/[githubLogin]/features/total-earned-graph/total-earned-graph";
import { TotalEarnedGraphLoading } from "app/migration/u/[githubLogin]/features/total-earned-graph/total-earned-graph.loading";
import { WorkDistributionGraph } from "app/migration/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph";
import { WorkDistributionGraphLoading } from "app/migration/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph.loading";

import { ProfileOverview } from "./features/profile-overview/profile-overview";

export default async function PublicProfilePage({ params }: { params: { githubLogin: string } }) {
  const userProfile = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(params.githubLogin).request();

  const ecosystems = (userProfile?.ecosystems || []).map(ecosystem => ({
    name: ecosystem.name,
    logoUrl: ecosystem.logoUrl,
    id: ecosystem.id,
  }));

  return (
    <div className="flex w-full flex-col items-start justify-start gap-10">
      <Suspense fallback={<ProfileOverviewLoading />}>
        <ProfileOverview githubLogin={params.githubLogin} />
      </Suspense>
      <div className="flex w-full flex-row items-start justify-start gap-6">
        <div className="flex flex-1 flex-col items-start justify-start gap-10">
          <LanguagesSection />
          <EcosystemsSection />
        </div>
        <div className="flex w-1/3 flex-col items-start justify-start gap-6">
          <ActivityGraph githubUserId={userProfile.githubUserId} ecosystems={ecosystems} />
          <Suspense fallback={<TotalEarnedGraphLoading />}>
            <TotalEarnedGraph githubUserId={userProfile.githubUserId} />
          </Suspense>
          <Suspense fallback={<WorkDistributionGraphLoading />}>
            <WorkDistributionGraph githubUserId={userProfile.githubUserId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
