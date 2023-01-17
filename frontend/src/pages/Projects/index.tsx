import { gql } from "@apollo/client";
import sortBy from "lodash/sortBy";
import { useEffect, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import QueryWrapper from "src/components/QueryWrapper";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useProjectLeadInvitations } from "src/hooks/useProjectLeadInvitations";
import { HasuraUserRole } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import { useT } from "talkr";

export default function Projects() {
  const { T } = useT();
  const { isLoggedIn, ledProjectIds } = useAuth();
  const { getInvitationForProject, amIInvitedForProject, allInvitations } = useProjectLeadInvitations();

  const getProjectsQuery = useHasuraQuery<GetProjectsQuery>(GET_PROJECTS_QUERY, HasuraUserRole.Public);
  const [projects, setProjects] = useState(getProjectsQuery.data?.projects);

  useEffect(() => {
    setProjects(sortBy(getProjectsQuery.data?.projects, project => !amIInvitedForProject(project.id)));
  }, [isLoggedIn, getProjectsQuery.data, allInvitations]);

  const isProjectMine = (projectId: string) => ledProjectIds.includes(projectId) || amIInvitedForProject(projectId);

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
                      getInvitationForProject(project.id) ? "bg-amber-700/20" : "bg-white/[0.02]"
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
                      {getInvitationForProject(project.id) && (
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
  query GetProjects {
    projects {
      id
      name
      projectDetails {
        description
        telegramLink
        logoUrl
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
