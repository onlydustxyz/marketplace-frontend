import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { merge, sortBy } from "lodash";
import { useMemo, useEffect } from "react";
import ProjectCard from "src/components/ProjectCard";
import { useAuth } from "src/hooks/useAuth";
import { Ownership as ProjectOwnership, useProjectFilter } from "src/pages/Projects/useProjectFilter";
import AllProjectsFallback from "./AllProjectsFallback";
import { contextWithCacheHeaders } from "src/utils/headers";
import {
  GetProjectsDocument,
  GetProjectsQuery,
  OrderBy,
  ProjectsBoolExp,
  ProjectsOrderBy,
} from "src/__generated/graphql";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";
import SortingDropdown, { PROJECT_SORTINGS, Sorting } from "src/pages/Projects/Sorting/SortingDropdown";
import { useIntl } from "src/hooks/useIntl";
import { FilterButton } from "src/pages/Projects/FilterPanel/FilterButton";
import { SortButton } from "src/pages/Projects/Sorting/SortButton";

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
}: Props) {
  const { T } = useIntl();

  const { ledProjectIds, githubUserId, isLoggedIn, user } = useAuth();
  const {
    projectFilter: { technologies, sponsors, ownership },
    clear: clearFilters,
  } = useProjectFilter();

  const getProjectsQuery = useSuspenseQuery<GetProjectsQuery>(GetProjectsDocument, {
    variables: {
      where: buildQueryFilters(search, technologies, sponsors),
      orderBy: buildQuerySorting(sorting || DEFAULT_SORTING),
    },
    ...contextWithCacheHeaders,
  });

  const projects = useMemo(() => {
    let projects = getProjectsQuery.data?.projects.map(p => ({
      ...p,
      pendingInvitations: p.pendingInvitations.filter(i => i.githubUserId === githubUserId),
    }));
    if (projects && isLoggedIn && ownership === ProjectOwnership.Mine) {
      projects = projects.filter(
        project => ledProjectIds.includes(project.id) || project.pendingInvitations.length > 0
      );
    }
    return sortBy(
      projects?.filter(project => isProjectVisibleToUser({ project, user: { userId: user?.id, githubUserId } })),
      p => !p.pendingInvitations.length
    );
  }, [getProjectsQuery.data?.projects, ledProjectIds, ownership, isLoggedIn, githubUserId]);

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

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
        {projects && projects.length > 0 ? (
          projects.map(project => <ProjectCard key={project.id} project={project} />)
        ) : (
          <AllProjectsFallback
            clearFilters={() => {
              clearFilters();
              clearSearch();
            }}
          />
        )}
      </div>
    </div>
  );
}

const buildQueryFilters = (search: string, technologies: string[], sponsors: string[]): ProjectsBoolExp => {
  let filters = {} as ProjectsBoolExp;

  if (search.trim().length > 0) {
    const words = search
      .split(" ")
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .map(word => ({
        _or: [{ name: { _ilike: `%${word}%` } }, { shortDescription: { _ilike: `%${word}%` } }],
      }));
    filters = merge(filters, {
      _and: words,
    });
  }

  if (technologies.length) {
    filters = merge(filters, { githubRepos: { repo: { languages: { _hasKeysAny: technologies } } } });
  }

  if (sponsors.length) {
    filters = merge(filters, { sponsors: { sponsor: { name: { _in: sponsors } } } });
  }

  return filters;
};

export const buildQuerySorting = (sorting: Sorting): ProjectsOrderBy[] => {
  const orderBy = {} as ProjectsOrderBy;

  switch (sorting) {
    case Sorting.Trending:
      return [merge(orderBy, { rank: OrderBy.Desc }), ...buildQuerySorting(Sorting.ContributorsCount)];

    case Sorting.ProjectName:
      return [merge(orderBy, { name: OrderBy.Asc })];

    case Sorting.ContributorsCount:
      return [
        merge(orderBy, { contributorsAggregate: { count: OrderBy.Desc } }),
        ...buildQuerySorting(Sorting.ProjectName),
      ];

    case Sorting.ReposCount:
      return [
        merge(orderBy, { githubReposAggregate: { count: OrderBy.Desc } }),
        ...buildQuerySorting(Sorting.ProjectName),
      ];
  }
};
