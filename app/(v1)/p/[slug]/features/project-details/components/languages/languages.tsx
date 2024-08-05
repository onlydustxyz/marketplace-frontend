import { useMemo } from "react";

import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TLanguages } from "./languages.types";

export function Languages({ languages }: TLanguages.Props) {
  const languageNames = useMemo(() => languages?.map(({ name }) => name) ?? [], [languages]);

  if (!languageNames.length) return null;

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.languages",
        params: { count: languageNames.length },
      }}
      remixIconName="ri-code-s-slash-line"
    >
      <Typography variant="body-s" className="leading-relaxed">
        {languageNames.join(", ")}
      </Typography>
    </Section>
  );
}
