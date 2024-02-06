import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";

import { Typography } from "components/layout/typography/typography";

import Section, { SectionIcon } from "./OverviewSection";

interface Props {
  // TODO get ecosystems type when it's available
  technologies: UseGetProjectBySlugResponse["technologies"];
}

export const ProjectOverviewTechnologies = ({ technologies }: Props) => {
  const { T } = useIntl();

  const technologiesArray = Object.keys(technologies);

  return technologiesArray?.length ? (
    <Section
      icon={SectionIcon.Code}
      title={T("project.details.overview.technologies", { count: technologiesArray.length })}
    >
      <Typography variant="body-s">{technologiesArray.join(", ")}</Typography>
    </Section>
  ) : null;
};
