import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import Section, { SectionIcon } from "src/pages/ProjectDetails/Overview/OverviewPanel/Section";
import Sponsor from "src/pages/ProjectDetails/Overview/OverviewPanel/Sponsor";

export interface ProjectOverviewSponsorsProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewSponsors = ({ project }: ProjectOverviewSponsorsProps) => {
  const { T } = useIntl();

  return project.sponsors?.length > 0 ? (
    <Section
      testId="sponsors"
      icon={SectionIcon.Service}
      title={T("project.details.overview.sponsors", { count: project.sponsors?.length })}
    >
      <div data-testid="sponsors" className="flex flex-row flex-wrap gap-3">
        {project.sponsors.map(sponsor => (
          <Sponsor key={sponsor.id} name={sponsor.name} logoUrl={sponsor.logoUrl} externalUrl={sponsor.url} />
        ))}
      </div>
    </Section>
  ) : null;
};
