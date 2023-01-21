import { gql } from "@apollo/client";
import { sortBy } from "lodash";
import { useMemo } from "react";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import ProjectCard from "src/components/ProjectCard";
import QueryWrapper from "src/components/QueryWrapper";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { ArrayElement, HasuraUserRole } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import { useT } from "talkr";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

export default function Projects() {
  const { T } = useT();
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
    <div className="bg-space h-full">
      <div className="container mx-auto pt-16 h-full">
        <div className="text-5xl font-belwe">{T("navbar.projects")}</div>
        <QueryWrapper query={getProjectsQuery}>
          <div className="px-10 flex flex-col align-center items-center gap-5 mt-10">
            {projects &&
              projects.map(project => (
                <Link
                  key={project.id}
                  className="flex w-11/12 my-3"
                  to={generatePath(isProjectMine(project) ? RoutePaths.MyProjectDetails : RoutePaths.ProjectDetails, {
                    projectId: project.id,
                  })}
                >
                  <ProjectCard {...project} />
                </Link>
              ))}
          </div>
        </QueryWrapper>
      </div>
    </div>
  );
}

export const GET_PROJECTS_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT}
  query GetProjects($githubUserId: bigint = 0) {
    projects {
      id
      name
      totalSpentAmountInUsd
      projectDetails {
        description
        telegramLink
        logoUrl
      }
      pendingInvitations(where: { githubUserId: { _eq: $githubUserId } }) {
        id
      }
      projectLeads {
        user {
          displayName
          avatarUrl
        }
      }
      githubRepo {
        ...GithubRepoFieldsForProjectCard
      }
    }
  }
`;
