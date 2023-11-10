import { useEffect, useMemo } from "react";
import { InView } from "react-intersection-observer";
import ErrorFallback from "src/ErrorFallback";
import ProjectApi from "src/api/Project";
import { useInfiniteBaseQueryProps } from "src/api/useInfiniteBaseQuery";
import ProjectCard from "src/components/ProjectCard";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import SortingDropdown, { PROJECT_SORTINGS, Sorting } from "src/pages/Projects/Sorting/SortingDropdown";
import { useProjectFilter } from "src/pages/Projects/useProjectFilter";
import { FilterButton } from "../FilterPanel/FilterButton";
import { SortButton } from "../Sorting/SortButton";
import AllProjectsFallback from "./AllProjectsFallback";
import AllProjectLoading from "./AllProjectsLoading";

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

  const queryParams = useMemo(() => {
    const params: useInfiniteBaseQueryProps["queryParams"] = [
      technologies.length > 0 ? ["technologies", technologies.join(",")] : null,
      sponsors.length > 0 ? ["sponsor", sponsors.join(",")] : null,
      search ? ["search", search] : null,
      sorting ? ["sort", sorting] : null,
      ownership ? ["mine", String(ownership === "Mine")] : null,
    ].filter((param): param is string[] => Boolean(param));

    return params;
  }, [technologies, sponsors, search, sorting, ownership]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectApi.queries.useInfiniteList({
      queryParams,
    });

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  useEffect(() => {
    if (data && !isLoading) {
      const technologies =
        [...new Set(data?.pages?.flatMap(({ technologies }) => (technologies ? technologies : "")))] ?? [];
      const sponsors = [...new Set(data?.pages?.flatMap(({ sponsors }) => (sponsors ? sponsors : "")))] ?? [];
      setTechnologies(technologies.length ? replaceApostrophes(technologies) : []);
      setSponsors(sponsors);
    }
  }, [data]);

  if (isLoading) {
    return <AllProjectLoading />;
  }

  if (isError) {
    return <ErrorFallback />;
  }

  const projects = data?.pages?.flatMap(({ projects }) => projects) ?? [];

  if (projects.length) {
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
          {projects.map((project, index) => {
            const isFirstHiringProject = index === 0 && project.hiring;
            return (
              <ProjectCard className={isFirstHiringProject ? "mt-3" : undefined} key={project.id} project={project} />
            );
          })}
          {hasNextPage ? (
            <InView
              onChange={inView => {
                if (inView) fetchNextPage();
              }}
            >
              <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
            </InView>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <AllProjectsFallback
      clearFilters={() => {
        clearFilters();
        clearSearch();
      }}
    />
  );
}

function replaceApostrophes(array: string[]): string[] {
  return array.map(item => item.replace(/'/g, " "));
}
