"use client";

import { Flex } from "@/components/layout/flex/flex";
import { FC } from "react";
import { GlobalTags } from "./global-tags";
import { TechnologyTags } from "./technology-tags copy";
import { SponsorTags } from "./sponsor-tags";

export interface TagsProps {
  type: "global" | "technologies" | "sponsors";
}

export const Tags: FC<TagsProps> = ({ type }) => {
  return (
    <Flex className="gap-2">
      {type === "global" && <GlobalTags />}
      {type === "technologies" && <TechnologyTags />}
      {type === "sponsors" && <SponsorTags />}
    </Flex>
  );
};
