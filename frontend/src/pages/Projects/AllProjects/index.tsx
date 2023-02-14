import { gql } from "@apollo/client";
import { sortBy } from "lodash";
import { useMemo } from "react";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import ProjectCard, { PROJECT_CARD_FRAGMENT } from "src/components/ProjectCard";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";
import { GetProjectsQuery } from "src/__generated/graphql";
import { Project, ProjectOwnershipType } from "..";

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
      projects = projects.filter(project => ledProjectIds.includes(project.id));
    }
    return sortBy(projects, p => !p.pendingInvitations.length);
  }, [getProjectsQuery.data?.projects, ledProjectIds, projectOwnershipType]);

  const isProjectMine__deprecated = (project: Project) =>
    ledProjectIds.includes(project?.id) || project?.pendingInvitations?.length > 0;

  return (
    <QueryWrapper query={getProjectsQuery}>
      <div className="flex flex-col gap-5 grow">
        {projects &&
          projects.map(project => (
            <Link
              key={project.id}
              to={generatePath(
                !isFeatureEnabled(FeatureFlags.MERGE_MY_PROJECTS) && isProjectMine__deprecated(project)
                  ? RoutePaths.MyProjectDetails__deprecated
                  : RoutePaths.ProjectDetails,
                {
                  projectId: project.id,
                }
              )}
            >
              <ProjectCard {...project} />
            </Link>
          ))}
      </div>
    </QueryWrapper>
  );
}

const buildQueryArgs = (technologies: string[]) => (technologies.length ? ", $languages: [String!]" : "");

const buildQueryFilters = (technologies: string[]) => {
  let filters = "";
  if (technologies.length) {
    filters += "{githubRepo: {languages: {_hasKeysAny: $languages}}}";
  }

  return filters.length ? `where: ${filters}, ` : "";
};

export const buildGetProjectsQuery = (technologies: string[]) => gql`
  ${PROJECT_CARD_FRAGMENT}
  query GetProjects($githubUserId: bigint = 0${buildQueryArgs(technologies)}) {
    projects(${buildQueryFilters(technologies)}orderBy: {budgetsAggregate: {sum: {spentAmount: DESC}}}) {
      ...ProjectCardFields
    }
  }
`;
