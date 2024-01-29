import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";

import Section, { SectionIcon } from "./OverviewSection";

export interface ProjectOverviewContributorProps {
  contributorCount: number;
  topContributors: UseGetProjectBySlugResponse["topContributors"];
}

export const ProjectOverviewContributor = ({ contributorCount, topContributors }: ProjectOverviewContributorProps) => {
  const { T } = useIntl();

  return contributorCount ? (
    <Section icon={SectionIcon.User} title={T("project.details.overview.contributors", { count: contributorCount })}>
      <div className="flex flex-row items-center gap-2 text-sm font-normal text-greyscale-50">
        <div className="flex flex-row -space-x-1">
          {(topContributors || []).map(contributor => (
            <RoundedImage
              key={contributor.login}
              src={contributor.avatarUrl}
              alt={contributor.login}
              size={ImageSize.Xs}
              rounding={Rounding.Circle}
            />
          ))}
        </div>
        <div data-testid="contributors-count">{contributorCount}</div>
      </div>
    </Section>
  ) : null;
};
