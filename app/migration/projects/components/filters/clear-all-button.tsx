"use client";

import { Button } from "@/components/ds/button/button";
import { Icon } from "@/components/layout/icon/icon";
import Translate from "@/components/layout/translate/translate";
import { FC } from "react";

export const ClearAllButton: FC = () => {
  const handleClearAll = () => {
    console.log("Clear all");
  };

  return (
    <Button onClick={handleClearAll} type="tertiary" size="xs">
      <Icon remixName="ri-refresh-line" size={12} />
      <Translate token="filter.clearButton" />
    </Button>
  );
};
