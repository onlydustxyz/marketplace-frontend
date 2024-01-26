import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import Section, { SectionIcon } from "./OverviewSection";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";

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
          <div key={sponsor.id}>
            {sponsor.url ? (
              <Link href={sponsor.url} className="flex items-center gap-2">
                <RoundedImage alt={sponsor.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={sponsor.logoUrl} />
                {sponsor.name}
              </Link>
            ) : (
              <Typography variant="body-s" className="flex items-center gap-2">
                <RoundedImage alt={sponsor.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={sponsor.logoUrl} />
                {sponsor.name}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </Section>
  ) : null;
};
