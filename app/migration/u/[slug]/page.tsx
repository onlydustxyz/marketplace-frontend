import { ActivityGraph } from "app/migration/u/[slug]/features/activity-graph/activity-graph";
import { EcosystemsSection } from "app/migration/u/[slug]/features/ecosystems-section/ecosystems-section";
import { LanguagesSection } from "app/migration/u/[slug]/features/languages-section/languages-section";
import { ProfileCard } from "app/migration/u/[slug]/features/profile-card/profile-card";
import { TotalEarnedGraph } from "app/migration/u/[slug]/features/total-earned-graph/total-earned-graph";
import { WorkDistributionGraph } from "app/migration/u/[slug]/features/work-distribution-graph/work-distribution-graph";

function PublicProfilePage() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-10">
      <ProfileCard />
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

export default PublicProfilePage;
