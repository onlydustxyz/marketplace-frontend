import { useMemo, useEffect } from "react";
import ProjectCard from "src/components/ProjectCard";
import { useProjectFilter } from "src/pages/Projects/useProjectFilter";
import AllProjectsFallback from "./AllProjectsFallback";
import SortingDropdown, { PROJECT_SORTINGS, Sorting } from "src/pages/Projects/Sorting/SortingDropdown";
import { useIntl } from "src/hooks/useIntl";
import { FilterButton } from "src/pages/Projects/FilterPanel/FilterButton";
import { SortButton } from "src/pages/Projects/Sorting/SortButton";
import { ApiResourcePaths } from "src/App/DataWrapper/config";
import { useRestfulData } from "src/hooks/useRestfulData";
import ErrorFallback from "src/ErrorFallback";
import AllProjectLoading from "./AllProjectsLoading";
import { Project } from "src/types";

export const DEFAULT_SORTING = Sorting.Trending;

type Props = {
  search: string;
  clearSearch: () => void;
  sorting?: Sorting;
  setSorting: (sorting?: Sorting) => void;
  restoreScroll: () => void;
  filterPanelOpen: boolean;
  setFilterPanelOpen: (open: boolean) => void;
  sortingPanelOpen: boolean;
  setSortingPanelOpen: (open: boolean) => void;
  setTechnologies: (technologies: string[]) => void;
  setSponsors: (sponsors: string[]) => void;
};

export default function AllProjects({
  search,
  clearSearch,
  sorting,
  setSorting,
  restoreScroll,
  filterPanelOpen,
  setFilterPanelOpen,
  sortingPanelOpen,
  setSortingPanelOpen,
  setTechnologies,
  setSponsors,
}: Props) {
  const { T } = useIntl();

  const {
    projectFilter: { ownership, technologies, sponsors },
    clear: clearFilters,
  } = useProjectFilter();

  const queryParams = useMemo(
    () => [
      ...(technologies.length > 0 ? [{ key: "technologies", value: technologies }] : []),
      ...(sponsors.length > 0 ? [{ key: "sponsor", value: sponsors }] : []),
      ...(search ? [{ key: "search", value: [search] }] : []),
      ...(sorting ? [{ key: "sort", value: [sorting] }] : []),
      ...(ownership ? [{ key: "mine", value: [ownership === "Mine" ? true : false] }] : []),
    ],
    [technologies, sponsors, search, sorting, ownership]
  );

  const { data, isLoading, isError } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_ALL_PROJECTS,
    queryParams,
    method: "GET",
  });

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  useEffect(() => {
    if (data && !isLoading) {
      const { technologies, sponsors } = data;
      setTechnologies(replaceApostrophes(technologies) || []);
      setSponsors(sponsors || []);
    }
  }, [data]);

  if (isLoading) {
    return <AllProjectLoading />;
  }

  // if there is an error we need to return ErrorFallback component
  if (isError) {
    return <ErrorFallback />;
  }

  const { projects } = data || { projects: [] };

  // if projects is empty and loading is false, we need to return a fallback
  if (projects.length === 0 && !isError && !isLoading) {
    return (
      <AllProjectsFallback
        clearFilters={() => {
          clearFilters();
          clearSearch();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="relative flex h-10 items-center justify-between">
        <div className="px-2 font-medium text-spaceBlue-200">{T("projects.count", { count: projects.length })}</div>
        <div className="absolute right-0 top-0 z-10 hidden xl:block">
          <SortingDropdown all={PROJECT_SORTINGS} current={sorting || DEFAULT_SORTING} onChange={setSorting} />
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <SortButton panelOpen={sortingPanelOpen} setPanelOpen={setSortingPanelOpen} />
          <FilterButton panelOpen={filterPanelOpen} setPanelOpen={setFilterPanelOpen} />
        </div>
      </div>
      <div className="flex grow flex-col gap-5">
        {projects.map((project: Project, index: number) => {
          const isFirstHiringProject = index === 0 && project.hiring;
          return (
            <ProjectCard className={isFirstHiringProject ? "mt-3" : undefined} key={project.id} project={project} />
          );
        })}
      </div>
    </div>
  );
}

function replaceApostrophes(array: string[]): string[] {
  return array.map(item => item.replace(/'/g, " "));
}
