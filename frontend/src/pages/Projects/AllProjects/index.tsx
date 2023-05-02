import { gql, useSuspenseQuery_experimental } from "@apollo/client";
import { sortBy } from "lodash";
import { useMemo } from "react";
import ProjectCard from "src/components/ProjectCard";
import { useAuth } from "src/hooks/useAuth";
import { isProjectVisible } from "src/utils/project";
import { Ownership as ProjectOwnership, useProjectFilter } from "src/pages/Projects/useProjectFilter";
import AllProjectsFallback from "./AllProjectsFallback";
import { contextWithCacheHeaders } from "src/utils/headers";
import { GetProjectsQuery, ProjectCardFieldsFragmentDoc } from "src/__generated/graphql";

export default function AllProjects() {
  const { ledProjectIds, githubUserId, isLoggedIn } = useAuth();
  const {
    projectFilter: { technologies, sponsors, ownership },
    clear: clearFilters,
  } = useProjectFilter();

  const getProjectsQuery = useSuspenseQuery_experimental<GetProjectsQuery>(
    buildGetProjectsQuery(technologies, sponsors),
    {
      variables: { languages: technologies, sponsors },
      ...contextWithCacheHeaders,
    }
  );

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

const buildQueryFilters = (technologies: string[], sponsors: string[]) => {
  const filters = [];
  if (technologies.length) {
    filters.push("githubRepos: {githubRepoDetails: {languages: {_hasKeysAny: $languages}}}");
  }
  if (sponsors.length) {
    filters.push("projectSponsors: {sponsor: {name: {_in: $sponsors}}}");
  }
  return filters.length ? `where: {${filters.join(", ")}}, ` : "";
};

export const buildGetProjectsQuery = (technologies: string[], sponsors: string[]) => gql`
  ${ProjectCardFieldsFragmentDoc}
  query GetProjects($languages: [String!], $sponsors: [String!]) {
    projects(${buildQueryFilters(technologies, sponsors)}orderBy: {budgetsAggregate: {sum: {spentAmount: DESC}}}) {
      ...ProjectCardFields
    }
  }
`;
