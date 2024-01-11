import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";

import Section, { SectionIcon } from "./OverviewSection";

export interface ProjectOverviewSponsorsProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewSponsors = ({ project }: ProjectOverviewSponsorsProps) => {
  const { T } = useIntl();

  return project.sponsors?.length > 0 ? (
    <Section
      testId="sponsors"
      icon={SectionIcon.Service}
      title={T("project.details.overview.sponsors", { count: project.sponsors?.length || 0 })}
    >
      <div data-testid="sponsors" className="flex flex-row flex-wrap gap-3">
        {project.sponsors.map(sponsor => (
          <div key={sponsor.id} className="flex flex-row items-center gap-2 text-sm font-normal">
            <RoundedImage alt={sponsor.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={sponsor.logoUrl} />
            {sponsor.url ? <ExternalLink url={sponsor.url} text={sponsor.name} /> : sponsor.name}
          </div>
        ))}
      </div>
    </Section>
  ) : null;
};
