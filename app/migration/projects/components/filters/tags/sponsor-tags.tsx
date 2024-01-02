"use client";

import { SelectableTag } from "@/components/ds/selectable-tag/selectable-tag";
import Projects from "app/migration/projects/_temp-mock";
import { FC } from "react";

export const SponsorTags: FC = () => {
  const sponsors = Projects[0].sponsors;

  const handleClick = (id: string) => {
    console.log(`Sponsor tag ${id} selected`);
  };

  return (
    <>
      {sponsors.map(sponsor => (
        <SelectableTag key={sponsor.id} selected={false} onClick={() => handleClick(sponsor.id)}>
          {sponsor.name}
        </SelectableTag>
      ))}
    </>
  );
};
