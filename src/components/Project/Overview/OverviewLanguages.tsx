import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import Section, { SectionIcon } from "./OverviewSection";

interface Props {
  languages: UseGetProjectBySlugResponse["languages"];
}

export function ProjectOverviewLanguages({ languages }: Props) {
  const { T } = useIntl();

  if (!languages.length) return null;

  return (
    <Section
      icon={SectionIcon.Code}
      title={T("v2.pages.project.overview.projectDetails.languages", { count: languages.length })}
    >
      <Typography variant="body-s" className="leading-relaxed">
        {languages.map(({ name }) => name).join(", ")}
      </Typography>
    </Section>
  );
}
