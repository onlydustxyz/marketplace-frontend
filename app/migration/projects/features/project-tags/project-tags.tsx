import { IconTag } from "components/ds/icon-tag/icon-tag";
import { Flex } from "components/layout/flex/flex";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";
import { ProjectTypes } from "src/api/Project/types";
import { useContext } from "react";
import { ProjectsContext } from "app/migration/projects/context/project.context";

type ProjectTag = "BEGINNERS_WELCOME" | "FAST_PACED" | "LIKELY_TO_SEND_REWARDS" | "STRONG_EXPERTISE";

interface ProjectTagsProps {
  tags: ProjectTag[];
}

const tagIconMapping: Record<ProjectTag, RemixIconsName> = {
  BEGINNERS_WELCOME: "ri-seedling-line" as RemixIconsName,
  FAST_PACED: "ri-rocket-2-line" as RemixIconsName,
  LIKELY_TO_SEND_REWARDS: "ri-hand-coin-line" as RemixIconsName,
  STRONG_EXPERTISE: "ri-git-fork-line" as RemixIconsName,
};

const tagTooltipMapping: Record<ProjectTag, string> = {
  BEGINNERS_WELCOME: "projects.tags.tooltips.beginnersWelcome",
  FAST_PACED: "projects.tags.tooltips.fastPaced",
  LIKELY_TO_SEND_REWARDS: "projects.tags.tooltips.likelyToSendRewards",
  STRONG_EXPERTISE: "projects.tags.tooltips.strongExpertise",
};

export function ProjectTags({ tags }: ProjectTagsProps) {
  const { filters } = useContext(ProjectsContext);
  return (
    <Flex direction="row" className="gap-2">
      {tags.map(tag => (
        <IconTag
          key={tag}
          remixName={tagIconMapping[tag]}
          size="medium"
          tooltipContent={<Translate token={tagTooltipMapping[tag]} />}
          active={filters.values.tags.length > 1 ? filters.values.tags.includes(tag as ProjectTypes.Tags) : false}
        />
      ))}
    </Flex>
  );
}
