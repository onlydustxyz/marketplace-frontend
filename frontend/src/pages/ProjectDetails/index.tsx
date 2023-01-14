import { gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { useT } from "talkr";

import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { buildGithubLink, decodeBase64ToString } from "src/utils/stringUtils";
import { GetPublicProjectQuery, GetUserProjectQuery, GetProjectsForSidebarQuery } from "src/__generated/graphql";
import Overview from "./Overview";
import Payments from "./PaymentActions";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import Sidebar from "src/components/Sidebar";
import UpDownChevrons from "src/assets/icons/UpDownChevrons";
import GithubLink from "src/components/GithubLink";
import TelegramLink from "src/components/TelegramLink";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import ShootingStar from "src/assets/icons/ShootingStar";

import { RoutePaths } from "src/App";
import BackLink from "src/components/BackLink";
import Contributors from "./Contributors";
import CheckLine from "src/icons/CheckLine";
import RoundedImage from "src/components/RoundedImage";
import sortBy from "lodash/sortBy";
import { useSession } from "src/hooks/useSession";
import { useProjectLeadInvitations } from "src/hooks/useProjectLeadInvitations";

type ProjectDetailsParams = {
  projectId: string;
};

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
  Contributors = "Contributors",
}

export default function ProjectDetails() {
  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(ProjectDetailsTab.Overview);
  const { projectId } = useParams<ProjectDetailsParams>();
  const { isLoggedIn, ledProjectIds } = useAuth();
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);
  const { lastVisitedProjectId, setLastVisitedProjectId } = useSession();
  const { getInvitationForProject, amIInvitedForProject, allInvitations, acceptInvitation, acceptInvitationResponse } =
    useProjectLeadInvitations();

  const navigate = useNavigate();
  const { T } = useT();

  const onChangeProjectFromDropdown = (project: any) => {
    setSelectedProjectId(project.id);
  };

  useEffect(() => {
    if (selectedProjectId && selectedProjectId !== projectId) {
      setSelectedTab(ProjectDetailsTab.Overview);
      navigate(generatePath(RoutePaths.MyProjectDetails, { projectId: selectedProjectId }));
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (projectId && projectId !== lastVisitedProjectId() && isProjectMine(projectId)) {
      setLastVisitedProjectId(projectId);
    }
  }, [projectId, allInvitations]);

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

  useEffect(() => {
    if (acceptInvitationResponse.data) {
      window.location.reload();
    }
  }, [acceptInvitationResponse.data]);

  const isProjectMine = (projectId: string) => ledProjectIds.includes(projectId) || !!amIInvitedForProject(projectId);

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Contributors, ProjectDetailsTab.Payments]
      : [ProjectDetailsTab.Overview, ProjectDetailsTab.Contributors];

  const project = getProjectUserQuery?.data?.projectsByPk || getProjectPublicQuery?.data?.projectsByPk;
  const githubRepo = project?.githubRepo;
  const logoUrl = project?.projectDetails?.logoUrl || project?.githubRepo?.content.logoUrl || onlyDustLogo;

  const projects = useMemo(() => {
    const projects = getProjectsForSidebarQuery?.data?.projects.filter(({ id }) => isProjectMine(id));
    return sortBy(projects, project => !amIInvitedForProject(project.id));
  }, [getProjectsForSidebarQuery?.data?.projects, ledProjectIds, allInvitations]);

  const currentProjectIsMine = projectId && isProjectMine(projectId);

  const component = (
    <>
      {project && projects && (
        <div className="flex flex-1 w-full gap-2 h-full">
          <Sidebar>
            {!currentProjectIsMine && (
              <BackLink to={RoutePaths.Projects} className="divide-none">
                {T("project.details.sidebar.backToProjects")}
              </BackLink>
            )}
            <div className="flex flex-col gap-6 divide-y divide-neutral-700 w-full">
              <div className="relative h-16">
                <Listbox value={project} onChange={onChangeProjectFromDropdown} disabled={!currentProjectIsMine}>
                  <div className="flex flex-col w-full border-2 rounded-2xl border-neutral-700 divide-y divide-neutral-700 bg-white/[0.02] absolute backdrop-blur-4xl z-10">
                    <Listbox.Button
                      className={`p-4 font-medium text-2xl ${currentProjectIsMine ? "hover:cursor-pointer" : ""}`}
                    >
                      <div className="flex flex-row gap-3 items-center">
                        <RoundedImage src={logoUrl} alt="Project Logo" className="object-cover w-8 h-8" />
                        <div className="truncate grow font-belwe text-left">{project.name}</div>
                        {currentProjectIsMine && <UpDownChevrons className="h-5 w-5 fill-gray-400" />}
                      </div>
                    </Listbox.Button>
                    <Listbox.Options className="flex flex-col divide-y">
                      {projects.map(projectFromDropdown => (
                        <Listbox.Option
                          key={projectFromDropdown.id}
                          value={projectFromDropdown}
                          className={`hover:cursor-pointer p-4 hover:bg-white/10 border-neutral-600 duration-300 last:rounded-b-2xl ${
                            getInvitationForProject(projectFromDropdown.id) && "bg-orange-400/10  hover:bg-amber-700/30"
                          } `}
                        >
                          <div className="flex flex-col gap-5">
                            <div className="flex flex-row gap-5 items-center">
                              <RoundedImage
                                src={
                                  projectFromDropdown?.projectDetails?.logoUrl ||
                                  projectFromDropdown?.githubRepo?.content?.logoUrl ||
                                  onlyDustLogo
                                }
                                alt="Project Logo"
                                className="object-cover w-10 h-10"
                              />
                              <div className="flex flex-col flex-1 justify-self-start truncate">
                                <div className="truncate text-base font-medium">{projectFromDropdown.name}</div>
                                <div className="truncate text-sm font-regular text-slate-400">
                                  {projectFromDropdown.githubRepo?.content?.contributors?.length ?? 0}{" "}
                                  {T("project.details.sidebar.contributors")}
                                </div>
                              </div>
                              <>
                                {getInvitationForProject(projectFromDropdown.id) ? (
                                  <div className="flex flex-row px-2 py-1 rounded-2xl bg-orange-400 items-center gap-1 text-xs text-black">
                                    <ShootingStar />
                                    <div>{T("project.details.sidebar.newInvite")}</div>
                                  </div>
                                ) : (
                                  projectFromDropdown.id === projectId && (
                                    <CheckLine className="text-gray-200 text-lg font-normal" />
                                  )
                                )}
                              </>
                            </div>
                            {getInvitationForProject(projectFromDropdown.id) && (
                              <div className="bg-neutral-100 rounded-xl w-full text-black text-sm text-center p-2">
                                View invite
                              </div>
                            )}
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div className="flex flex-col align-start font-medium text-xl pt-3 pb-2 gap-2">
                {availableTabs.map((tab: ProjectDetailsTab) => (
                  <div
                    key={tab}
                    className={`rounded-xl hover:cursor-pointer text-white text-base px-4 py-2.5 ${
                      selectedTab === tab ? "bg-white/[0.08]" : "text-neutral-400"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                    data-testid={`${tab}-tab`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-2 pt-8">
                {project?.projectDetails?.telegramLink && <TelegramLink link={project.projectDetails.telegramLink} />}
                {project?.githubRepo?.owner && project?.githubRepo?.name && (
                  <GithubLink link={buildGithubLink(project.githubRepo.owner, project.githubRepo.name)} />
                )}
              </div>
            </div>
          </Sidebar>
          <div className="bg-space p-5 flex flex-col flex-1 rounded-r-2xl">
            {selectedTab === ProjectDetailsTab.Overview &&
              githubRepo?.content?.contributors &&
              projectId &&
              project?.name && (
                <Overview
                  decodedReadme={
                    githubRepo.content.readme?.content && decodeBase64ToString(githubRepo.content.readme.content)
                  }
                  lead={project?.projectLeads?.[0]?.user}
                  totalSpentAmountInUsd={project?.totalSpentAmountInUsd}
                  githubRepoInfo={{
                    name: githubRepo.name,
                    owner: githubRepo.owner,
                    contributors: githubRepo.content?.contributors,
                    languages: githubRepo.languages,
                  }}
                >
                  {project.name && amIInvitedForProject(projectId) && (
                    <ProjectLeadInvitation
                      projectName={project.name}
                      onClick={() => {
                        acceptInvitation({
                          variables: {
                            invitationId: getInvitationForProject(projectId)?.id,
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
            {selectedTab === ProjectDetailsTab.Contributors && projectId && <Contributors projectId={projectId} />}
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
      totalSpentAmountInUsd
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
      totalSpentAmountInUsd
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
