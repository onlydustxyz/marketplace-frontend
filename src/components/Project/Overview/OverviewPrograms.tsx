import { components } from "src/__generated/api";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";

import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import Section, { SectionIcon } from "./OverviewSection";

export interface ProjectOverviewProgramsProps {
  programs?: UseGetProjectBySlugResponse["programs"];
}

interface LinkContentProps {
  program: components["schemas"]["ProgramShortResponse"];
}

const LinkContent = ({ program }: LinkContentProps) => {
  return (
    <>
      <RoundedImage alt={program.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={program.logoUrl} />
      {program.name}
    </>
  );
};

export const ProjectOverviewPrograms = ({ programs }: ProjectOverviewProgramsProps) => {
  const { T } = useIntl();

  return programs?.length ? (
    <Section
      testId="programs"
      icon={SectionIcon.Service}
      title={T("project.details.overview.programs", { count: programs?.length || 0 })}
    >
      <div data-testid="sponsors" className="flex flex-row flex-wrap gap-3">
        {programs.map(program => (
          <div key={program.id}>
            {program.url ? (
              <Link href={program.url} className="flex items-center gap-2">
                <LinkContent program={program} />
              </Link>
            ) : (
              <Typography variant="body-s" className="flex items-center gap-2">
                <LinkContent program={program} />
              </Typography>
            )}
          </div>
        ))}
      </div>
    </Section>
  ) : null;
};
