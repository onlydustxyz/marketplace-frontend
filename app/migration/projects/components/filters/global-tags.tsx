"use client";

import { SelectableTag } from "@/components/ds/selectable-tag/selectable-tag";
import { Flex } from "@/components/layout/flex/flex";
import { Icon } from "@/components/layout/icon/icon";
import Translate from "@/components/layout/translate/translate";
import { FC } from "react";

export const GlobalTags: FC = () => {
  const handleAllClick = () => {
    console.log("Global tag all selected");
  };

  const handleMineClick = () => {
    console.log("Global tag mine selected");
  };

  return (
    <Flex className="gap-2">
      <SelectableTag selected={true} onClick={handleAllClick}>
        <Translate token="filter.ownership.all" />
      </SelectableTag>

      <SelectableTag selected={false} onClick={handleMineClick}>
        <Icon remixName="ri-star-line" />
        <Translate token="filter.ownership.mine" />
      </SelectableTag>
    </Flex>
  );
};
