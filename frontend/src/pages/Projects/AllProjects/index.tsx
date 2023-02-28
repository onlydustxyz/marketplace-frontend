import { gql } from "@apollo/client";
import { sortBy } from "lodash";
import { useMemo } from "react";
import ProjectCard, { PROJECT_CARD_FRAGMENT } from "src/components/ProjectCard";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetProjectsQuery, ProjectCardFieldsFragment } from "src/__generated/graphql";
import { ProjectOwnershipType } from "..";

type Props = {
  technologies: string[];
  projectOwnershipType: ProjectOwnershipType;
};

export default function AllProjects({ technologies, projectOwnershipType }: Props) {
  const { ledProjectIds, githubUserId } = useAuth();

  const getProjectsQuery = useHasuraQuery<GetProjectsQuery>(
    buildGetProjectsQuery(technologies),
    HasuraUserRole.Public,
    {
      variables: { githubUserId, languages: technologies },
    }
  );

  const projects = useMemo(() => {
    let projects = getProjectsQuery.data?.projects;
    if (projects && projectOwnershipType === ProjectOwnershipType.Mine) {
      projects = projects.filter(
        project => ledProjectIds.includes(project.id) || project.pendingInvitations.length > 0
      );
    }
    return sortBy(projects?.filter(isProjectVisible), p => !p.pendingInvitations.length);
  }, [getProjectsQuery.data?.projects, ledProjectIds, projectOwnershipType]);

  return (
    <QueryWrapper query={getProjectsQuery}>
      <div className="flex flex-col gap-5 grow">
        {projects && projects.map(project => <ProjectCard key={project.id} {...project} />)}
      </div>
    </QueryWrapper>
  );
}

const buildQueryArgs = (technologies: string[]) => (technologies.length ? ", $languages: [String!]" : "");

const buildQueryFilters = (technologies: string[]) => {
  let filters = "";
  if (technologies.length) {
    filters += "{githubRepos: {githubRepoDetails: {languages: {_hasKeysAny: $languages}}}}";
  }

  return filters.length ? `where: ${filters}, ` : "";
};

const isProjectVisible = (project: ProjectCardFieldsFragment) => {
  const hasLeaders = project.projectLeads.length > 0;
  const hasRepos = project.githubRepos.length > 0;
  const hasBudget = project.budgets.length > 0;
  const hasInvitation = project.pendingInvitations.length > 0;

  return (hasLeaders && hasRepos && hasBudget) || hasInvitation;
};

export const buildGetProjectsQuery = (technologies: string[]) => gql`
  ${PROJECT_CARD_FRAGMENT}
  query GetProjects($githubUserId: bigint = 0${buildQueryArgs(technologies)}) {
    projects(${buildQueryFilters(technologies)}orderBy: {budgetsAggregate: {sum: {spentAmount: DESC}}}) {
      ...ProjectCardFields
    }
  }
`;
