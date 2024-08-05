import { useContext, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import FilterIcon from "src/assets/icons/FilterIcon";
import { viewportConfig } from "src/config";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { ProjectsContext } from "../../context/project.context";
import { FiltersClearAll } from "./clear-all/clear-all";
import { FiltersCategories } from "./filters-categories/filters-categories";
import { FiltersEcosystems } from "./filters-ecosystems/filters-ecosystems";
import { FiltersLanguages } from "./filters-languages/filters-languages";
import { FiltersTags } from "./filters-tags/filters-tags";

export function ProjectsFilters({ showOn }: { showOn: "mobile" | "desktop" }) {
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const [openMobilePanel, setOpenMobilePanel] = useState(false);
  const { filters } = useContext(ProjectsContext);
  if (!isLg && showOn === "mobile") {
    return (
      <>
        <Button variant={"secondary"} size="s" onClick={() => setOpenMobilePanel(true)}>
          <FilterIcon />
          <Translate token="v2.pages.projects.filters.mobileButton" params={{ count: filters.count }} />
        </Button>
        <BottomSheet
          background="blue"
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
              <FiltersLanguages />
            </div>
            <div className="py-4">
              <FiltersCategories />
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
    <Card className="flex h-fit flex-col" background="base" hasPadding={false}>
      <Flex justifyContent="between" alignItems="center" className="border-b-1 border-card-border-medium px-6 py-4">
        <Typography variant="title-s" translate={{ token: "v2.pages.projects.filters.title" }} />
        <FiltersClearAll />
      </Flex>
      <div className="border-b-1 border-card-border-light px-6 py-4">
        <FiltersTags />
      </div>
      <div className="border-b-1 border-card-border-light px-6 py-4">
        <FiltersEcosystems />
      </div>
      <div className="border-b-1 border-card-border-light px-6 py-4">
        <FiltersLanguages />
      </div>
      <div className="px-6 py-4">
        <FiltersCategories />
      </div>
    </Card>
  );
}
