import { gql } from "@apollo/client";
import { sortBy } from "lodash";
import { useMemo } from "react";
import ProjectCard, { PROJECT_CARD_FRAGMENT } from "src/components/ProjectCard";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { isProjectVisible } from "src/utils/project";
import { GetProjectsQuery } from "src/__generated/graphql";
import { Ownership as ProjectOwnership, useProjectFilter } from "src/pages/Projects/useProjectFilter";
import AllProjectsFallback from "./AllProjectsFallback";

export default function AllProjects() {
  const { ledProjectIds, githubUserId, isLoggedIn } = useAuth();
  const {
    projectFilter: { technologies, sponsors, ownership },
    clear: clearFilters,
  } = useProjectFilter();

  const getProjectsQuery = useHasuraQuery<GetProjectsQuery>(
    buildGetProjectsQuery(technologies, sponsors),
    HasuraUserRole.Public,
    {
      variables: { languages: technologies, sponsors },
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
    <QueryWrapper query={getProjectsQuery}>
      <div className="flex flex-col gap-5 grow">
        {projects && projects.length > 0 ? (
          projects.map(project => <ProjectCard key={project.id} {...project} />)
        ) : (
          <AllProjectsFallback clearFilters={clearFilters} />
        )}
      </div>
    </QueryWrapper>
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
  ${PROJECT_CARD_FRAGMENT}
  query GetProjects($languages: [String!], $sponsors: [String!]) {
    projects(${buildQueryFilters(technologies, sponsors)}orderBy: {budgetsAggregate: {sum: {spentAmount: DESC}}}) {
      ...ProjectCardFields
    }
  }
`;
