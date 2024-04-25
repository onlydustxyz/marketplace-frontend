import { useMemo } from "react";

import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { getFilteredTechnologies } from "src/utils/technologies";

import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import Section, { SectionIcon } from "./OverviewSection";

interface Props {
  technologies: UseGetProjectBySlugResponse["technologies"];
}

export const ProjectOverviewTechnologies = ({ technologies }: Props) => {
  const { T } = useIntl();

  const technologiesArray = useMemo(() => {
    return getFilteredTechnologies(technologies).filteredTechArray.map(([tech]) => tech);
  }, [technologies]);

  return technologiesArray?.length ? (
    <Section
      icon={SectionIcon.Code}
      title={T("project.details.overview.technologies", { count: technologiesArray.length })}
    >
      <Typography variant="body-s" className="leading-relaxed">
        {technologiesArray.join(", ")}
      </Typography>
    </Section>
  ) : null;
};
