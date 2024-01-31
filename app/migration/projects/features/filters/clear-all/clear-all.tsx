"use client";

import { useContext } from "react";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersClearAll() {
  const { filters } = useContext(ProjectsContext);

  if (!filters.count) {
    return null;
  }

  return (
    <Button onClick={filters.clear} variant="tertiary" size="xs">
      <Icon remixName="ri-refresh-line" size={12} />
      <Translate token="v2.pages.projects.filters.clear" />
    </Button>
  );
}
