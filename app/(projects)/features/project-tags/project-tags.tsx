import { useContext } from "react";

import { ProjectConstants } from "src/api/Project/constants";
import { ProjectTypes } from "src/api/Project/types";

import { IconTag } from "components/ds/icon-tag/icon-tag";
import { Translate } from "components/layout/translate/translate";

import { ProjectsContext } from "../../context/project.context";

import tagMapping = ProjectConstants.tagMapping;

interface ProjectTagsProps {
  tags: ProjectTypes.TagsUnion[];
}

export function ProjectTags({ tags }: ProjectTagsProps) {
  const { filters } = useContext(ProjectsContext);
  return (
    <>
      {tags.map(tag => (
        <IconTag
          key={tag}
          icon={tagMapping[tag].icon}
          tooltipContent={<Translate token={tagMapping[tag].tooltip} />}
          active={filters.values.tags.length > 1 ? filters.values.tags.includes(tag as ProjectTypes.Tags) : false}
        />
      ))}
    </>
  );
}
