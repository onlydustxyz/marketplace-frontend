import { Suspense, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useDebounce } from "usehooks-ts";

import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import SidePanel from "src/components/SidePanel";
import { useLeadProjects } from "src/hooks/useProjectLeader/useProjectLeader";
import { Sponsor } from "src/types";

import { DEFAULT_SORTING } from "./AllProjects";
import AllProjects from "./AllProjects";
import AllProjectLoading from "./AllProjects/AllProjectsLoading";
import useScrollRestoration from "./AllProjects/useScrollRestoration";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";
import { SortingPanel } from "./Sorting/SortingPanel";
import SubmitProject from "./SubmitProject";
import { ProjectFilterProvider } from "./useProjectFilter";

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
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

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
            <div className="sticky top-0 z-10 hidden shrink-0 basis-80 xl:block">
              <div className="sticky top-4">
                <SubmitProject />
                <FilterPanel
                  isProjectLeader={!!isProjectLeader.length}
                  availableTechnologies={technologies}
                  availableSponsors={sponsors}
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
          availableTechnologies={technologies}
          availableSponsors={sponsors}
        />
      </SidePanel>
      <SidePanel withBackdrop open={sortingPanelOpen} setOpen={setSortingPanelOpen} placement="bottom">
        <SortingPanel all={PROJECT_SORTINGS} current={sorting || DEFAULT_SORTING} onChange={setSorting} />
      </SidePanel>
    </ProjectFilterProvider>
  );
}
