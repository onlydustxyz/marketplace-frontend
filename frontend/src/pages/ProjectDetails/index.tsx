import { gql } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "src/components/Card";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetPublicProjectQuery, GetUserProjectQuery } from "src/__generated/graphql";
import Overview from "./Overview";
import Payments from "./PaymentActions";
import onlyDustLogo from "assets/img/onlydust-logo.png";

type ProjectDetailsParams = {
  projectId: string;
};

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
}

export default function ProjectDetails() {
  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(ProjectDetailsTab.Overview);
  const { projectId } = useParams<ProjectDetailsParams>();
  const { ledProjectIds, isLoggedIn } = useAuth();
  const getProjectPublicQuery = useHasuraQuery<GetPublicProjectQuery>(GET_PROJECT_PUBLIC_QUERY, HasuraUserRole.Public, {
    variables: { id: projectId },
    skip: isLoggedIn,
  });

  const getProjectUserQuery = useHasuraQuery<GetUserProjectQuery>(
    GET_PROJECT_USER_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { id: projectId },
      skip: !isLoggedIn,
    }
  );

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Payments]
      : [ProjectDetailsTab.Overview];

  const project = getProjectUserQuery?.data?.projectsByPk || getProjectPublicQuery?.data?.projectsByPk;
  const githubRepo = project?.githubRepo;
  const logoUrl = project?.projectDetails?.logoUrl || project?.githubRepo?.content.logoUrl || onlyDustLogo;

  const component = (
    <div className="px-10 flex flex-col align-center items-center">
      {project && (
        <div className="flex flex-col w-11/12 my-3 gap-5">
          <Card>
            <div className="flex flex-col divide-y">
              <div className="flex flex-row justify-between items-center mb-5">
                <div className="border-4 border-neutral-600 p-2 rounded-2xl">
                  <img className="md:w-20 w-20 hover:opacity-90" src={logoUrl} alt="Project Logo" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">{project.name}</div>
                  {project.projectDetails?.description && (
                    <div className="text-lg px-8 py-4 text-center">{project.projectDetails.description}</div>
                  )}
                </div>
              </div>
              <div className="font-medium text-xl items-center justify-items-center">
                <div className="flex flex-row align-start divide-x h-20">
                  {availableTabs.map((tab: ProjectDetailsTab) => (
                    <div
                      key={tab}
                      className={`first:pr-5 last:pl-5 pt-6 flex w-fit hover:cursor-pointer text-white ${
                        selectedTab === tab ? "font-bold" : "text-neutral-400"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          {selectedTab === ProjectDetailsTab.Overview && githubRepo?.content?.contributors && (
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
            />
          )}
          {selectedTab === ProjectDetailsTab.Payments && (
            <Payments budget={getProjectUserQuery?.data?.projectsByPk?.budgets?.[0]} />
          )}
        </div>
      )}
    </div>
  );

  return isLoggedIn ? (
    <QueryWrapper query={getProjectUserQuery}>{component}</QueryWrapper>
  ) : (
    <QueryWrapper query={getProjectPublicQuery}>{component}</QueryWrapper>
  );
}

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
