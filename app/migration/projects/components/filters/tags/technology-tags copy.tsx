"use client";

import { SelectableTag } from "@/components/ds/selectable-tag/selectable-tag";
import Projects from "app/migration/projects/_temp-mock";
import { FC } from "react";

export const TechnologyTags: FC = () => {
  const tags = Object.keys(Projects[0].technologies);

  const handleClick = (id: string) => {
    console.log(`Technology tag ${id} selected`);
  };

  return (
    <>
      {tags.map(tag => (
        <SelectableTag key={tag.toLowerCase()} selected={false} onClick={() => handleClick(tag)}>
          {tag}
        </SelectableTag>
      ))}
    </>
  );
};
