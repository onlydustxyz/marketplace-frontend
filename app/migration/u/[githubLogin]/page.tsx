import { usersApiClient } from "api-client/resources/users";
import { notFound } from "next/navigation";

import { ActivityGraph } from "app/migration/u/[githubLogin]/features/activity-graph/activity-graph";
import { EcosystemsSection } from "app/migration/u/[githubLogin]/features/ecosystems-section/ecosystems-section";
import { LanguagesSection } from "app/migration/u/[githubLogin]/features/languages-section/languages-section";
import { TotalEarnedGraph } from "app/migration/u/[githubLogin]/features/total-earned-graph/total-earned-graph";
import { WorkDistributionGraph } from "app/migration/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph";

import { ProfileOverview } from "./features/profile-overview/profile-overview";

async function getUserPublicProfile(githubLogin: string) {
  try {
    return await usersApiClient.fetch.getUserPublicProfileByGithubLogin(githubLogin).request();
  } catch {
    notFound();
  }
}
export default async function PublicProfilePage({ params }: { params: { githubLogin: string } }) {
  const data = await getUserPublicProfile(params.githubLogin);
  console.log("data", data);
  return (
    <div className="flex w-full flex-col items-start justify-start gap-10">
      <ProfileOverview />
      <div className="flex w-full flex-row items-start justify-start gap-6">
        <div className="flex flex-1 flex-col items-start justify-start gap-10">
          <LanguagesSection />
          <EcosystemsSection />
        </div>
        <div className="flex w-1/3 flex-col items-start justify-start gap-6">
          <ActivityGraph />
          <TotalEarnedGraph />
          <WorkDistributionGraph />
        </div>
      </div>
    </div>
  );
}
