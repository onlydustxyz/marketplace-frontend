import { gql, QueryResult } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { useT } from "talkr";

import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { buildGithubLink, decodeBase64ToString } from "src/utils/stringUtils";
import {
  GetPublicProjectQuery,
  GetUserProjectQuery,
  GetProjectsForSidebarQuery,
  PendingProjectLeaderInvitationsQuery,
} from "src/__generated/graphql";
import Overview from "./Overview";
import Payments from "./PaymentActions";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import Sidebar from "src/components/Sidebar";
import UpDownChevrons from "src/assets/icons/UpDownChevrons";
import CheckMark from "src/assets/icons/CheckMark";
import GithubLink from "src/components/GithubLink";
import TelegramLink from "src/components/TelegramLink";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import ShootingStar from "src/assets/icons/ShootingStar";
import { PENDING_PROJECT_LEADER_INVITATIONS_QUERY } from "src/graphql/queries";

import { RoutePaths } from "src/App";
import hasProjectInvitation from "src/utils/hasProjectInvitation";

interface ProjectDetailsProps {
  onlyMine?: boolean;
}

type ProjectDetailsParams = {
  projectId: string;
};

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
}

export default function ProjectDetails({ onlyMine = false }: ProjectDetailsProps) {
  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(ProjectDetailsTab.Overview);
  const { projectId } = useParams<ProjectDetailsParams>();
  const { ledProjectIds, isLoggedIn } = useAuth();
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);

  const navigate = useNavigate();
  const { T } = useT();

  const onChangeProjectFromDropdown = (project: any) => {
    setSelectedProjectId(project.id);
  };

  useEffect(() => {
    if (selectedProjectId !== projectId) {
      setSelectedTab(ProjectDetailsTab.Overview);
      navigate(
        generatePath(
          onlyMine ? RoutePaths.MyProjectDetails : RoutePaths.ProjectDetails,
          selectedProjectId ? { projectId: selectedProjectId } : undefined
        )
      );
    }
  }, [selectedProjectId]);

  const getProjectPublicQuery = useHasuraQuery<GetPublicProjectQuery>(GET_PROJECT_PUBLIC_QUERY, HasuraUserRole.Public, {
    variables: { id: projectId },
    skip: isLoggedIn || !projectId,
  });

  const getProjectUserQuery = useHasuraQuery<GetUserProjectQuery>(
    GET_PROJECT_USER_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { id: projectId },
      skip: !isLoggedIn || !projectId,
    }
  );

  const getProjectsForSidebarQuery = useHasuraQuery<GetProjectsForSidebarQuery>(
    GET_PROJECTS_FOR_SIDEBAR_QUERY,
    HasuraUserRole.Public
  );

  const pendingProjectLeaderInvitationsQuery = useHasuraQuery<PendingProjectLeaderInvitationsQuery>(
    PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    { skip: !isLoggedIn }
  );

  const [acceptProjectLeaderInvitation, acceptProjectLeaderInvitationMutation] = useHasuraMutation(
    ACCEPT_PROJECT_LEADER_INVITATION_MUTATION,
    HasuraUserRole.RegisteredUser
  );

  useEffect(() => {
    if (acceptProjectLeaderInvitationMutation.data) {
      window.location.reload();
    }
  }, [acceptProjectLeaderInvitationMutation]);

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Payments]
      : [ProjectDetailsTab.Overview];
  const showTabs = availableTabs.length > 1;

  const project = getProjectUserQuery?.data?.projectsByPk || getProjectPublicQuery?.data?.projectsByPk;
  const githubRepo = project?.githubRepo;
  const logoUrl = project?.projectDetails?.logoUrl || project?.githubRepo?.content.logoUrl || onlyDustLogo;

  const projects = useMemo(
    () => getProjectsForSidebarQuery?.data?.projects.filter(({ id }) => (onlyMine ? ledProjectIds.includes(id) : true)),
    [getProjectsForSidebarQuery?.data?.projects, ledProjectIds]
  );

  const component = (
    <>
      {project && projects && (
        <div className="flex flex-row w-full gap-3 items-stretch p-5">
          <Sidebar>
            <Listbox value={project} onChange={onChangeProjectFromDropdown}>
              <div className="flex flex-col gap-3">
                <Listbox.Button className="border-2 rounded-2xl hover:cursor-pointer p-3 font-medium text-2xl border-neutral-700">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="border-4 border-neutral-600 p-2 rounded-xl">
                      <img className="w-8 " src={logoUrl} alt="Project Logo" />
                    </div>
                    <div className="truncate">{project.name}</div>
                    <div className="ml-5">
                      <UpDownChevrons className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </Listbox.Button>
                <Listbox.Options className="flex flex-col border-2 border-neutral-700 divide-y rounded-2xl">
                  {projects.map(projectFromDropdown => (
                    <Listbox.Option
                      key={projectFromDropdown.id}
                      value={projectFromDropdown}
                      className={`hover:cursor-pointer p-3 hover:bg-neutral-800 border-neutral-600 duration-300 last:rounded-b-lg ${
                        hasProjectInvitation(pendingProjectLeaderInvitationsQuery, projectFromDropdown.id) &&
                        "bg-amber-700/20  hover:bg-amber-700/30"
                      } `}
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-5 items-center">
                          <div className="border-4 border-neutral-600 p-2 rounded-2xl flex-none">
                            <img
                              className="w-8"
                              src={
                                projectFromDropdown?.projectDetails?.logoUrl ||
                                projectFromDropdown?.githubRepo?.content?.logoUrl ||
                                onlyDustLogo
                              }
                              alt="Project Logo"
                            />
                          </div>
                          <div className="flex flex-col justify-self-start truncate">
                            <div className="truncate text-xl font-medium">{projectFromDropdown.name}</div>
                            <div className="truncate text-lg font-regular text-neutral-500">
                              {projectFromDropdown.githubRepo?.content?.contributors?.length}{" "}
                              {T("project.details.sidebar.contributors")}
                            </div>
                          </div>
                          <>
                            {hasProjectInvitation(pendingProjectLeaderInvitationsQuery, projectFromDropdown.id) ? (
                              <div className="flex flex-row px-2 py-1 rounded-2xl bg-orange-400 items-center gap-1 text-xs text-black">
                                <ShootingStar />
                                <div>{T("project.details.sidebar.newInvite")}</div>
                              </div>
                            ) : (
                              <CheckMark
                                className={`h-5 w-5 ${
                                  projectFromDropdown.id === projectId ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            )}
                          </>
                        </div>
                        {hasProjectInvitation(pendingProjectLeaderInvitationsQuery, projectFromDropdown.id) && (
                          <div className="bg-neutral-100 rounded-xl w-full text-black text-lg text-center p-2">
                            View invite
                          </div>
                        )}
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {showTabs && (
              <div className="flex flex-col align-start font-medium text-xl pt-8">
                {availableTabs.map((tab: ProjectDetailsTab) => (
                  <div
                    key={tab}
                    className={`p-3 rounded-xl hover:cursor-pointer text-white ${
                      selectedTab === tab ? "bg-neutral-800" : "text-neutral-400"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-row gap-3 pt-8">
              {project?.githubRepo?.owner && project?.githubRepo?.name && (
                <GithubLink link={buildGithubLink(project.githubRepo.owner, project.githubRepo.name)} />
              )}
              {project?.projectDetails?.telegramLink && <TelegramLink link={project.projectDetails.telegramLink} />}
            </div>
          </Sidebar>
          <div className="bg-chineseBlack p-5 flex flex-col basis-4/5">
            {selectedTab === ProjectDetailsTab.Overview &&
              githubRepo?.content?.contributors &&
              projectId &&
              project?.name && (
                <Overview
                  decodedReadme={
                    githubRepo.content.readme?.content && decodeBase64ToString(githubRepo.content.readme.content)
                  }
                  lead={project?.projectLeads?.[0]?.user}
                  githubRepoInfo={{
                    name: githubRepo.name,
                    owner: githubRepo.owner,
                    contributors: githubRepo.content?.contributors,
                    languages: githubRepo.languages,
                  }}
                >
                  {project.name && hasProjectInvitation(pendingProjectLeaderInvitationsQuery, projectId) && (
                    <ProjectLeadInvitation
                      projectName={project.name}
                      onClick={() => {
                        acceptProjectLeaderInvitation({
                          variables: {
                            invitationId:
                              pendingProjectLeaderInvitationsQuery?.data?.pendingProjectLeaderInvitations?.[0]?.id,
                          },
                        });
                      }}
                    />
                  )}
                </Overview>
              )}
            {selectedTab === ProjectDetailsTab.Payments && projectId && (
              <Payments project={projectFromQuery(projectId, getProjectUserQuery?.data?.projectsByPk)} />
            )}
          </div>
        </div>
      )}
    </>
  );

  return isLoggedIn ? (
    <QueryWrapper query={getProjectUserQuery}>{component}</QueryWrapper>
  ) : (
    <QueryWrapper query={getProjectPublicQuery}>{component}</QueryWrapper>
  );
}

const projectFromQuery = (projectId: string, project: any) => ({
  id: projectId,
  budget: project.budgets[0],
});

const GITHUB_REPO_FIELDS_FRAGMENT = gql`
  fragment ProjectDetailsGithubRepoFields on GithubRepoDetails {
    name
    owner
    content {
      readme {
        content
      }
      contributors {
        login
        avatarUrl
      }
      logoUrl
    }
    languages
  }
`;

export const GET_PROJECT_PUBLIC_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FRAGMENT}
  query GetPublicProject($id: uuid!) {
    projectsByPk(id: $id) {
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
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;

export const GET_PROJECT_USER_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FRAGMENT}
  query GetUserProject($id: uuid!) {
    projectsByPk(id: $id) {
      name
      budgets {
        id
        initialAmount
        remainingAmount
      }
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
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;

export const GET_PROJECTS_FOR_SIDEBAR_QUERY = gql`
  query GetProjectsForSidebar {
    projects {
      id
      name
      projectDetails {
        logoUrl
      }
      githubRepo {
        content {
          contributors {
            login
          }
          logoUrl
        }
      }
    }
  }
`;

export const ACCEPT_PROJECT_LEADER_INVITATION_MUTATION = gql`
  mutation acceptProjectLeaderInvitation($invitationId: Uuid!) {
    acceptProjectLeaderInvitation(invitationId: $invitationId)
  }
`;
