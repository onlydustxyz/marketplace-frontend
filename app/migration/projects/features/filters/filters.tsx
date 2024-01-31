import { useContext, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { ProjectsContext } from "app/migration/projects/context/project.context";
import { FiltersEcosystems } from "app/migration/projects/features/filters/filters-ecosystems/filters-ecosystems";
import { FiltersMine } from "app/migration/projects/features/filters/filters-mine/filters-mine";
import { FiltersTags } from "app/migration/projects/features/filters/filters-tags/filters-tags";

import FilterIcon from "src/assets/icons/FilterIcon";
import { viewportConfig } from "src/config";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { FiltersClearAll } from "./clear-all/clear-all";
import { FiltersTechnologies } from "./filters-technologies/filters-technologies";

export function ProjectsFilters({ showOn }: { showOn: "mobile" | "desktop" }) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const [openMobilePanel, setOpenMobilePanel] = useState(false);
  const { filters } = useContext(ProjectsContext);

  if (!isXl && showOn === "mobile") {
    return (
      <>
        <Button variant={"secondary"} size="s" onClick={() => setOpenMobilePanel(true)}>
          <FilterIcon />
          <Translate token="v2.pages.projects.filters.mobileButton" params={{ count: filters.count }} />
        </Button>
        <BottomSheet
          onClose={() => setOpenMobilePanel(false)}
          open={openMobilePanel}
          title={
            <Flex className="gap-2" justifyContent="start" alignItems="center">
              <Translate token="v2.pages.projects.filters.title" as="div" />
              <FiltersClearAll />
            </Flex>
          }
        >
          <div className="flex w-full flex-col">
            <div className="border-b-1 border-card-border-medium py-4">
              <FiltersTags />
            </div>
            <div className="py-4">
              <FiltersEcosystems />
            </div>
            <div className="py-4">
              <FiltersTechnologies />
            </div>
          </div>
        </BottomSheet>
      </>
    );
  }

  if (showOn === "mobile") {
    return null;
  }

  return (
    <>
      <Card className="flex h-fit flex-col" background="base" border="medium" hasPadding={false}>
        <Flex justifyContent="between" alignItems="center" className="border-b-1 border-card-border-medium px-6 py-4">
          <Typography variant="title-s" translate={{ token: "v2.pages.projects.filters.title" }} />
          <FiltersClearAll />
        </Flex>
        <div className="border-b-1 border-card-border-medium px-6 py-4">
          <FiltersTags />
        </div>
        <div className="border-b-1 border-card-border-medium px-6 py-4">
          <FiltersEcosystems />
        </div>
        <div className="border-b-1 border-card-border-medium px-6 py-4">
          <FiltersTechnologies />
        </div>
        <div className="px-6 py-4">
          <FiltersMine />
        </div>
      </Card>
    </>
  );
}
