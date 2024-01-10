"use client";

import { Button } from "@/components/ds/button/button.tsx";
import { Icon } from "@/components/layout/icon/icon.tsx";
import Translate from "@/components/layout/translate/translate.tsx";
import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context.tsx";

export function FiltersClearAll() {
  const { filters } = useContext(ProjectsContext);

  return (
    <Button onClick={filters.clear} type="tertiary" size="xs">
      <Icon remixName="ri-refresh-line" size={12} />
      <Translate token="filter.clearButton" />
    </Button>
  );
}
