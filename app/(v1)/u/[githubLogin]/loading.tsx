import { ActivityGraphLoading } from "app/(v1)/u/[githubLogin]/features/activity-graph/activity-graph.loading";
import { EcosystemsSectionLoading } from "app/(v1)/u/[githubLogin]/features/ecosystems-section/ecosystems-section.loading";
import { LanguagesSectionLoading } from "app/(v1)/u/[githubLogin]/features/languages-section/languages-section.loading";
import { ProfileOverviewLoading } from "app/(v1)/u/[githubLogin]/features/profile-overview/profile-overview.loading";
import { TotalEarnedGraphLoading } from "app/(v1)/u/[githubLogin]/features/total-earned-graph/total-earned-graph.loading";
import { WorkDistributionGraphLoading } from "app/(v1)/u/[githubLogin]/features/work-distribution-graph/work-distribution-graph.loading";

export default function PublicProfilePageLoading() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-10">
      <ProfileOverviewLoading />
      <div className="flex w-full flex-row items-start justify-start gap-6">
        <div className="flex flex-1 flex-col items-start justify-start gap-10">
          <LanguagesSectionLoading />
          <EcosystemsSectionLoading />
        </div>
        <div className="flex w-1/3 flex-col items-start justify-start gap-6">
          <ActivityGraphLoading />
          <TotalEarnedGraphLoading />
          <WorkDistributionGraphLoading />
        </div>
      </div>
    </div>
  );
}
