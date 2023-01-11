import { gql } from "@apollo/client";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import QueryWrapper from "src/components/QueryWrapper";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { PENDING_PROJECT_LEADER_INVITATIONS_QUERY } from "src/graphql/queries";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import hasProjectInvitation from "src/utils/hasProjectInvitation";
import { GetProjectsQuery, PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";
import { useT } from "talkr";

export default function Projects() {
  const { T } = useT();
  const { isLoggedIn } = useAuth();

  const getProjectsQuery = useHasuraQuery<GetProjectsQuery>(GET_PROJECTS_QUERY, HasuraUserRole.Public);
  const pendingProjectLeaderInvitationsQuery = useHasuraQuery<PendingProjectLeaderInvitationsQuery>(
    PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    { skip: !isLoggedIn }
  );

  return (
    <div className="bg-space h-full">
      <div className="container mx-auto pt-16 h-full">
        <div className="text-5xl font-alfreda">{T("navbar.projects")}</div>
        <QueryWrapper<GetProjectsQuery> query={getProjectsQuery}>
          <div className="px-10 flex flex-col align-center items-center gap-5 mt-10">
            {getProjectsQuery.data &&
              getProjectsQuery.data.projects.map(project => (
                <Link
                  key={project.id}
                  className="flex w-11/12 my-3"
                  to={generatePath(RoutePaths.ProjectDetails, { projectId: project.id })}
                >
                  <Card
                    selectable={true}
                    className={
                      hasProjectInvitation(pendingProjectLeaderInvitationsQuery, project.id) ? "bg-amber-700/20" : ""
                    }
                  >
                    <div className="flex flex-col gap-5">
                      <ProjectInformation
                        name={project.name}
                        details={{
                          description: project?.projectDetails?.description,
                          telegramLink: project?.projectDetails?.telegramLink,
                          logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content.logoUrl,
                        }}
                        lead={project?.projectLeads?.[0]?.user}
                        githubRepoInfo={{
                          owner: project?.githubRepo?.owner,
                          name: project?.githubRepo?.name,
                          contributors: project?.githubRepo?.content?.contributors,
                          languages: project?.githubRepo?.languages,
                        }}
                      />
                      {hasProjectInvitation(pendingProjectLeaderInvitationsQuery, project.id) && (
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
