"use client";

import { useContext } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersClearAll() {
  const { filters } = useContext(ProjectsContext);

  return (
    <Button
      onClick={filters.clear}
      variant="tertiary"
      size="xs"
      aria-hidden={filters.count === 0}
      className={cn({
        "pointer-events-none opacity-0": filters.count === 0,
      })}
    >
      <Icon remixName="ri-refresh-line" size={12} />
      <Translate token="v2.pages.projects.filters.clear" />
    </Button>
  );
}
