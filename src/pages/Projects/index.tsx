import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { DEFAULT_SORTING } from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilterProvider } from "./useProjectFilter";
import useScrollRestoration from "./AllProjects/useScrollRestoration";
import { Suspense, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useDebounce } from "usehooks-ts";
import SidePanel from "src/components/SidePanel";
import { SortingPanel } from "./Sorting/SortingPanel";
import { useLocalStorage } from "react-use";
import SEO from "src/components/SEO";
import AllProjectLoading from "./AllProjects/AllProjectsLoading";
import AllProjects from "./AllProjects";
import SubmitProject from "./SubmitProject";
import { parseFlag } from "src/utils/parseFlag";
import { useLeadProjects } from "src/hooks/useProjectLeader/useProjectLeader";

export enum Sorting {
  Trending = "RANK",
  ProjectName = "NAME",
  ReposCount = "REPO_COUNT",
  ContributorsCount = "CONTRIBUTOR_COUNT",
}

export const PROJECT_SORTINGS = [Sorting.Trending, Sorting.ProjectName, Sorting.ReposCount, Sorting.ContributorsCount];

export default function Projects() {
  const isProjectLeader = useLeadProjects();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const debouncedSearchQuery = useDebounce<string>(search, 200);
  useEffect(() => setSearchQuery(debouncedSearchQuery), [debouncedSearchQuery]);

  const [sorting, setSorting] = useLocalStorage("PROJECT_SORTING_2", DEFAULT_SORTING);

  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortingPanelOpen, setSortingPanelOpen] = useState(false);

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [sponsors, setSponsors] = useState<string[]>([]);

  const { ref, restoreScroll } = useScrollRestoration();

  return (
    <ProjectFilterProvider>
      <SEO />
      <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
          <div>
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="flex h-full gap-6">
            <div className="sticky top-0 hidden shrink-0 basis-80 xl:block">
              <div className="sticky top-4">
                {parseFlag("VITE_CAN_CREATE_PROJECT") ? <SubmitProject /> : null}
                <FilterPanel
                  isProjectLeader={!!isProjectLeader.length}
                  technologies={technologies}
                  sponsors={sponsors}
                />
              </div>
            </div>
            <div className="min-w-0 grow">
              <Suspense fallback={<AllProjectLoading />}>
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
                  setTechnologies={setTechnologies}
                  setSponsors={setSponsors}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </Background>
      <SidePanel withBackdrop open={filterPanelOpen} setOpen={setFilterPanelOpen} placement="bottom">
        <FilterPanel
          isProjectLeader={!!isProjectLeader.length}
          fromSidePanel
          technologies={technologies}
          sponsors={sponsors}
        />
      </SidePanel>
      <SidePanel withBackdrop open={sortingPanelOpen} setOpen={setSortingPanelOpen} placement="bottom">
        <SortingPanel all={PROJECT_SORTINGS} current={sorting || DEFAULT_SORTING} onChange={setSorting} />
      </SidePanel>
    </ProjectFilterProvider>
  );
}
