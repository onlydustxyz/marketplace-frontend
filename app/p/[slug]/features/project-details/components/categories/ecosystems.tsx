import { useMemo } from "react";

import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TEcosystems } from "./ecosystems.types";

export function Categories({ categories }: TEcosystems.Props) {
  const categoriesName = useMemo(() => {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name)).map(({ name }) => name);
  }, [categories]);

  if (categoriesName.length === 0) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.categories",
        params: {
          count: categoriesName.length,
        },
      }}
      remixIconName="ri-box-3-line"
    >
      <Typography variant="body-s">{categoriesName.join(", ")}</Typography>
    </Section>
  );
}
