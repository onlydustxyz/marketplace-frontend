import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import Section, { SectionIcon } from "./OverviewSection";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { Typography } from "components/layout/typography/typography";
import { Link } from "components/ds/link/link";

export interface ProjectOverviewSponsorsProps {
  sponsors: UseGetProjectBySlugResponse["sponsors"];
}

interface LinkContentProps {
  sponsor: ProjectOverviewSponsorsProps["sponsors"][0];
}

const LinkContent = ({ sponsor }: LinkContentProps) => {
  return (
    <>
      <RoundedImage alt={sponsor.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={sponsor.logoUrl} />
      {sponsor.name}
    </>
  );
};

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
                <LinkContent sponsor={sponsor} />
              </Link>
            ) : (
              <Typography variant="body-s" className="flex items-center gap-2">
                <LinkContent sponsor={sponsor} />
              </Typography>
            )}
          </div>
        ))}
      </div>
    </Section>
  ) : null;
};
