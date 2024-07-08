import { useMemo } from "react";

import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import Section, { SectionIcon } from "./OverviewSection";

interface Props {
  categories: UseGetProjectBySlugResponse["categories"];
}

export const ProjectOverviewCategories = ({ categories }: Props) => {
  const { T } = useIntl();

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  if (sortedCategories.length === 0) {
    return null;
  }
  return sortedCategories?.length ? (
    <Section
      icon={SectionIcon.Global}
      title={T("v2.pages.project.overview.projectDetails.categories", { count: sortedCategories.length })}
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
  ) : null;
};
