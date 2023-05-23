import { useSuspenseQuery_experimental } from "@apollo/client";
import { merge, sortBy } from "lodash";
import { useMemo } from "react";
import ProjectCard from "src/components/ProjectCard";
import { useAuth } from "src/hooks/useAuth";
import { isProjectVisible } from "src/utils/project";
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

type Props = {
  sorting: Sorting;
};

export default function AllProjects({ sorting }: Props) {
  const { ledProjectIds, githubUserId, isLoggedIn } = useAuth();
  const {
    projectFilter: { technologies, sponsors, ownership },
    clear: clearFilters,
  } = useProjectFilter();

  const getProjectsQuery = useSuspenseQuery_experimental<GetProjectsQuery>(GetProjectsDocument, {
    variables: {
      where: buildQueryFilters(technologies, sponsors),
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
    return sortBy(projects?.filter(isProjectVisible(githubUserId)), p => !p.pendingInvitations.length);
  }, [getProjectsQuery.data?.projects, ledProjectIds, ownership, isLoggedIn, githubUserId]);

  return (
    <div className="flex flex-col gap-5 grow">
      {projects && projects.length > 0 ? (
        projects.map(project => <ProjectCard key={project.id} {...project} />)
      ) : (
        <AllProjectsFallback clearFilters={clearFilters} />
      )}
    </div>
  );
}

const buildQueryFilters = (technologies: string[], sponsors: string[]): ProjectsBoolExp => {
  let filters = {} as ProjectsBoolExp;

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
      return [merge(orderBy, { projectDetails: { rank: OrderBy.Desc } }), ...buildQuerySorting(Sorting.LeftToSpend)];

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

    case Sorting.LeftToSpend:
      return [
        merge(orderBy, { budgetsAggregate: { sum: { remainingAmount: OrderBy.Desc } } }),
        ...buildQuerySorting(Sorting.ProjectName),
      ];

    case Sorting.MoneyGranted:
      return [
        merge(orderBy, { budgetsAggregate: { sum: { spentAmount: OrderBy.Desc } } }),
        ...buildQuerySorting(Sorting.ProjectName),
      ];

    case Sorting.TotalBudget:
      return [
        merge(orderBy, { budgetsAggregate: { sum: { initialAmount: OrderBy.Desc } } }),
        ...buildQuerySorting(Sorting.ProjectName),
      ];
  }
};
