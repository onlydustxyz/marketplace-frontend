import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import Section, { SectionIcon } from "./OverviewSection";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import ExternalLink from "src/components/ExternalLink";

export interface ProjectOverviewSponsorsProps {
  sponsors: UseGetProjectBySlugResponse["sponsors"];
}

export const ProjectOverviewSponsors = ({ sponsors }: ProjectOverviewSponsorsProps) => {
  const { T } = useIntl();

  return sponsors?.length ? (
    <Section
      testId="sponsors"
      icon={SectionIcon.Service}
      title={T("project.details.overview.sponsors", { count: sponsors?.length || 0 })}
    >
      <div data-testid="sponsors" className="flex flex-row flex-wrap gap-3">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="flex flex-row items-center gap-2 text-sm font-normal">
            <RoundedImage alt={sponsor.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={sponsor.logoUrl} />
            {sponsor.url ? <ExternalLink url={sponsor.url} text={sponsor.name} /> : sponsor.name}
          </div>
        ))}
      </div>
    </Section>
  ) : null;
};
