import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";
import { Flex } from "components/layout/flex/flex";
import { FiltersTechnologies } from "./filters-technologies/filters-technologies";
import { FiltersClearAll } from "./clear-all/clear-all";
import { FiltersHighlight } from "app/migration/projects/features/filters/filters-highlight/filters-highlight";
import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";
import { Translate } from "components/layout/translate/translate";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config";
import { SortButton } from "src/_pages/Projects/Sorting/SortButton";
import { FilterButton } from "src/_pages/Projects/FilterPanel/FilterButton";
import { cn } from "src/utils/cn";
import FilterIcon from "src/assets/icons/FilterIcon";
import { Button } from "components/ds/button/button";

// <button
//     className={cn("flex items-center gap-2 rounded-xl border px-4 py-2 font-walsheim text-sm font-semibold", {
//         "border-fuchsia-500 bg-slate-900 text-fuchsia-300": panelOpen,
//     })}
//     onClick={() => setPanelOpen(true)}
// >
//     <FilterIcon/>{" "}
//     {T("filter.mobileButton", {
//         count: filterCount,
//     })}
// </button>

export function ProjectsFilters() {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  if (!isXl) {
    return (
      <>
        <Button
          className={cn("flex items-center gap-2 rounded-xl border px-4 py-2 font-walsheim text-sm font-semibold", {
            // "border-fuchsia-500 bg-slate-900 text-fuchsia-300": panelOpen,
          })}
          // onClick={() => setPanelOpen(true)}
        >
          <FilterIcon />
          {/*{T("filter.mobileButton", {*/}
          {/*  count: filterCount,*/}
          {/*})}*/}
          <Translate token="filter.mobileButton" params={{ count: 0 }} />
        </Button>
      </>
    );
  }
  return (
    <>
      <Card className="flex h-fit flex-col" background="base" border="medium" hasPadding={false}>
        <Flex justifyContent="between" alignItems="center" className="border-b-1 border-card-border-medium px-6 py-4">
          <Typography variant="title-s" translate={{ token: "filter.title" }} />
          <FiltersClearAll />
        </Flex>
        <div className="border-b-1 border-card-border-medium px-6 py-4">
          <FiltersHighlight />
        </div>
        <div className="border-b-1 border-card-border-medium px-6 py-4">
          <FiltersTechnologies />
        </div>
        <BottomSheet
          onOpen={() => null}
          open={true}
          title={
            <Flex className="gap-2" justifyContent="start" alignItems="center">
              <Translate token="filter.title" as="div" />
              <FiltersClearAll />
            </Flex>
          }
        >
          <div className="flex w-full flex-col">
            <div className="border-b-1 border-card-border-medium py-4">
              <FiltersHighlight />
            </div>
            <div className="py-4">
              <FiltersTechnologies />
            </div>
          </div>
        </BottomSheet>
      </Card>
      <FilterButton panelOpen={filterPanelOpen} setPanelOpen={setFilterPanelOpen} />
    </>
  );
}
