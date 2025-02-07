import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { IMAGES } from "src/assets/img";
import { ProjectOverviewCategories } from "src/components/Project/Overview/OverviewCategories";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewEcosystem } from "src/components/Project/Overview/OverviewEcosystem";
import { ProjectOverviewLanguages } from "src/components/Project/Overview/OverviewLanguages";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";
import { ProjectOverviewPrograms } from "src/components/Project/Overview/OverviewPrograms";
import isDefined from "src/utils/isDefined";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

// TODO clean/delete this file once the New All Project Page is live
export interface ProjectOverviewInformationsProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewInformations = ({ project }: ProjectOverviewInformationsProps) => {
  const { contributorCount, topContributors, leaders, moreInfos, ecosystems, programs, languages, categories } =
    project;
  const projectLeads = leaders?.filter(lead => isDefined(lead?.login)) || [];

  if (!projectLeads.length && !contributorCount && !programs?.length && !moreInfos?.length) {
    return (
      <Card>
        <EmptyState
          illustrationSrc={IMAGES.icons.compass}
          description={{ token: "project.details.overview.emptyStateDescription" }}
        />
      </Card>
    );
  }
  return (
    <div className="flex-col divide-y divide-greyscale-50/8 rounded-2xl border border-card-border-light bg-greyscale-900 shadow-medium">
      <ProjectOverviewContributor contributorCount={contributorCount} topContributors={topContributors} />
      <ProjectOverviewEcosystem ecosystems={ecosystems} />
      <ProjectOverviewPrograms programs={programs} />
      <ProjectOverviewLanguages languages={languages} />
      <ProjectOverviewCategories categories={categories} />
      <ProjectOverviewMoreInfo moreInfos={moreInfos} />
    </div>
  );
};
