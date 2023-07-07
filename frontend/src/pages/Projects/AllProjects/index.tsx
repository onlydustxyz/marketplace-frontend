import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { merge, sortBy } from "lodash";
import { useMemo } from "react";
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
import { Sorting } from "..";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";

type Props = {
  sorting: Sorting;
  search: string;
  clearSearch: () => void;
};

export default function AllProjects({ sorting, search, clearSearch }: Props) {
  const { ledProjectIds, githubUserId, isLoggedIn, user } = useAuth();
  const {
    projectFilter: { technologies, sponsors, ownership },
    clear: clearFilters,
  } = useProjectFilter();

  const getProjectsQuery = useSuspenseQuery<GetProjectsQuery>(GetProjectsDocument, {
    variables: {
      where: buildQueryFilters(search, technologies, sponsors),
      orderBy: buildQuerySorting(sorting),
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

  return (
    <div className="flex grow flex-col gap-5">
      {projects && projects.length > 0 ? (
        projects.map(project => <ProjectCard key={project.id} {...project} />)
      ) : (
        <AllProjectsFallback
          clearFilters={() => {
            clearFilters();
            clearSearch();
          }}
        />
      )}
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
      projectDetails: {
        _and: words,
      },
    });
  }

  if (technologies.length) {
    filters = merge(filters, { githubRepos: { repo: { languages: { _hasKeysAny: technologies } } } });
  }

  if (sponsors.length) {
    filters = merge(filters, { projectSponsors: { sponsor: { name: { _in: sponsors } } } });
  }

  return filters;
};

export const buildQuerySorting = (sorting: Sorting): ProjectsOrderBy[] => {
  const orderBy = {} as ProjectsOrderBy;

  switch (sorting) {
    case Sorting.Trending:
      return [
        merge(orderBy, { projectDetails: { rank: OrderBy.Desc } }),
        ...buildQuerySorting(Sorting.ContributorsCount),
      ];

    case Sorting.ProjectName:
      return [merge(orderBy, { projectDetails: { name: OrderBy.Asc } })];

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
