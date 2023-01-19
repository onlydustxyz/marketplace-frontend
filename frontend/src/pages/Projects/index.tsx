import { gql } from "@apollo/client";
import { sortBy } from "lodash";
import { useMemo } from "react";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import QueryWrapper from "src/components/QueryWrapper";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import { useT } from "talkr";

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

  const isProjectMine = (project: any) =>
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
                  to={generatePath(
                    isProjectMine(project.id) ? RoutePaths.MyProjectDetails : RoutePaths.ProjectDetails,
                    {
                      projectId: project.id,
                    }
                  )}
                >
                  <Card
                    selectable={true}
                    className={`bg-noise-light hover:bg-right ${
                      project.pendingInvitations.length > 0
                        ? "bg-amber-700/20"
                        : "bg-white/[0.02] hover:bg-white/[0.04]"
                    } `}
                    dataTestId="project-card"
                  >
                    <div className="flex flex-col gap-5">
                      <ProjectInformation
                        name={project.name}
                        details={{
                          description: project?.projectDetails?.description,
                          telegramLink: project?.projectDetails?.telegramLink,
                          logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content?.logoUrl,
                        }}
                        lead={project?.projectLeads?.[0]?.user}
                        githubRepoInfo={{
                          owner: project?.githubRepo?.owner,
                          name: project?.githubRepo?.name,
                          contributors: project?.githubRepo?.content?.contributors,
                          languages: project?.githubRepo?.languages,
                        }}
                      />
                      {project.pendingInvitations.length > 0 && (
                        <div className="flex flex-row justify-between items-center font-medium p-5 text-lg rounded-xl bg-amber-700/30">
                          <div>{T("project.projectLeadInvitation.prompt")}</div>
                          <div className="w-fit rounded-xl bg-neutral-100 shadow-inner shadow-neutral-100 py-2 px-5 text-chineseBlack">
                            {T("project.projectLeadInvitation.view")}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
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
