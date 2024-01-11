"use client";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";

export function FiltersClearAll() {
  const { filters } = useContext(ProjectsContext);

  return (
    <Button onClick={filters.clear} variant="tertiary" size="xs">
      <Icon remixName="ri-refresh-line" size={12} />
      <Translate token="filter.clearButton" />
    </Button>
  );
}
