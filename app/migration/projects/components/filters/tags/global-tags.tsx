"use client";

import { SelectableTag } from "@/components/ds/selectable-tag/selectable-tag";
import { Icon } from "@/components/layout/icon/icon";
import Translate from "@/components/layout/translate/translate";
import { FC } from "react";
import { GlobalTagsType } from "./tags.type";

export const GlobalTags: FC = () => {
  const handleClick = (type: GlobalTagsType) => {
    console.log(`Global tag ${type} selected`);
  };

  return (
    <>
      <SelectableTag selected={true} onClick={() => handleClick("all")}>
        <Translate token="filter.ownership.all" />
      </SelectableTag>

      <SelectableTag selected={false} onClick={() => handleClick("mine")}>
        <Icon remixName="ri-star-line" />
        <Translate token="filter.ownership.mine" />
      </SelectableTag>
    </>
  );
};
