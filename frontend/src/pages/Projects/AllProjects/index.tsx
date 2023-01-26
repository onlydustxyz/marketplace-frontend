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
import { GetProjectsQuery } from "src/__generated/graphql";
import { Project } from "..";

export default function AllProjects() {
  const { ledProjectIds, githubUserId } = useAuth();

  const getProjectsQuery = useHasuraQuery<GetProjectsQuery>(GET_PROJECTS_QUERY, HasuraUserRole.Public, {
    variables: { githubUserId },
  });

  const projects = useMemo(
    () => sortBy(getProjectsQuery.data?.projects, p => !p.pendingInvitations.length),
    [getProjectsQuery.data?.projects]
  );

  const isProjectMine = (project: Project) =>
    ledProjectIds.includes(project?.id) || project?.pendingInvitations?.length > 0;

  return (
    <QueryWrapper query={getProjectsQuery}>
      <div className="flex flex-col gap-5">
        {projects &&
          projects.map(project => (
            <Link
              key={project.id}
              to={generatePath(isProjectMine(project) ? RoutePaths.MyProjectDetails : RoutePaths.ProjectDetails, {
                projectId: project.id,
              })}
            >
              <ProjectCard {...project} />
            </Link>
          ))}
      </div>
    </QueryWrapper>
  );
}

export const GET_PROJECTS_QUERY = gql`
  ${PROJECT_CARD_FRAGMENT}
  query GetProjects($githubUserId: bigint = 0) {
    projects {
      ...ProjectCardFields
    }
  }
`;
