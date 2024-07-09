import { useMemo } from "react";

import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TCategories } from "./categories.types";

export function Categories({ categories }: TCategories.Props) {
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  if (sortedCategories.length === 0) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.categories",
        params: {
          count: sortedCategories.length,
        },
      }}
      remixIconName="ri-box-3-line"
    >
      <Flex wrap="wrap" className="gap-1">
        {sortedCategories.map(cat => (
          <Tag size="small" key={cat.slug}>
            <Icon remixName={cat.iconSlug as RemixIconsName} size={12} />
            <Typography variant="body-xs">{cat.name}</Typography>
          </Tag>
        ))}
      </Flex>
    </Section>
  );
}
