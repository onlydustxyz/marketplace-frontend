import { useContext } from "react";

import { IMAGES } from "src/assets/img";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

import { ProjectsContext } from "../../context/project.context";

export function NoResults() {
  const { filters } = useContext(ProjectsContext);
  return (
    <Card background="base" border="medium" className="flex h-full flex-col items-center justify-center">
      <EmptyState
        illustrationSrc={IMAGES.global.categories}
        title={{ token: "projects.fallback.title" }}
        description={{ token: "projects.fallback.subTitle" }}
        actionLabel={{ token: "projects.fallback.clearFiltersButton" }}
        onAction={filters.clear}
      />
    </Card>
  );
}
