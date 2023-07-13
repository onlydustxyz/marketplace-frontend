import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import AllProjects, { DEFAULT_SORTING } from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilterProvider } from "./useProjectFilter";
import useScrollRestoration from "./AllProjects/useScrollRestoration";
import { Suspense, useEffect, useState } from "react";
import Loader from "src/components/Loader";
import SearchBar from "./SearchBar";
import { useDebounce } from "usehooks-ts";
import SidePanel from "src/components/SidePanel";
import { SortingPanel } from "./SortingDropdown/SortingPanel";
import { useLocalStorage } from "react-use";

export enum Sorting {
  Trending = "trending",
  ProjectName = "projectName",
  ReposCount = "reposCount",
  ContributorsCount = "contributorsCount",
}

export const PROJECT_SORTINGS = [Sorting.Trending, Sorting.ProjectName, Sorting.ReposCount, Sorting.ContributorsCount];

export default function Projects() {
  const { ledProjectIds } = useAuth();
  const isProjectLeader = !!ledProjectIds.length;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const debouncedSearchQuery = useDebounce<string>(search, 200);
  useEffect(() => setSearchQuery(debouncedSearchQuery), [debouncedSearchQuery]);

  const [sorting, setSorting] = useLocalStorage("PROJECT_SORTING_2", DEFAULT_SORTING);

  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortingPanelOpen, setSortingPanelOpen] = useState(false);

  const { ref, restoreScroll } = useScrollRestoration();

  return (
    <ProjectFilterProvider>
      <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="flex flex-col gap-6 px-4 py-4 md:container md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
          <div>
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="flex h-full gap-6">
            <div className="sticky top-0 hidden shrink-0 basis-80 xl:block">
              <FilterPanel isProjectLeader={isProjectLeader} />
            </div>
            <div className="min-w-0 grow">
              <Suspense fallback={<Loader />}>
                <AllProjects
                  search={searchQuery}
                  clearSearch={() => setSearch("")}
                  sorting={sorting}
                  setSorting={setSorting}
                  restoreScroll={restoreScroll}
                  filterPanelOpen={filterPanelOpen}
                  setFilterPanelOpen={setFilterPanelOpen}
                  sortingPanelOpen={sortingPanelOpen}
                  setSortingPanelOpen={setSortingPanelOpen}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </Background>
      <SidePanel withBackdrop open={filterPanelOpen} setOpen={setFilterPanelOpen} placement="bottom">
        <FilterPanel isProjectLeader={isProjectLeader} fromSidePanel />
      </SidePanel>
      <SidePanel withBackdrop open={sortingPanelOpen} setOpen={setSortingPanelOpen} placement="bottom">
        <SortingPanel all={PROJECT_SORTINGS} current={sorting || DEFAULT_SORTING} onChange={setSorting} />
      </SidePanel>
    </ProjectFilterProvider>
  );
}
