import { useMemo } from "react";

import { getFilteredTechnologies } from "src/utils/technologies";

import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TTechnologies } from "./technologies.types";

// TODO: Refacto getFilteredTechnologies
export function Technologies({ technologies }: TTechnologies.Props) {
  const technologiesArray = useMemo(() => {
    return getFilteredTechnologies(technologies).filteredTechArray.map(([tech]) => tech);
  }, [technologies]);

  if (!technologiesArray.length) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.technologies",
        params: { count: technologiesArray.length },
      }}
      remixIconName="ri-code-s-slash-line"
    >
      <Typography variant="body-s" className="leading-relaxed">
        {technologiesArray.join(", ")}
      </Typography>
    </Section>
  );
}
