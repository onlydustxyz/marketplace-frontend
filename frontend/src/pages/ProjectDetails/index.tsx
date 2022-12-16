import { gql } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import { HasuraUserRole } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetPublicProjectQuery, GetUserProjectQuery } from "src/__generated/graphql";
import Overview from "./Overview";
import Payments from "./PaymentActions";

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
  const { hasuraToken } = useAuth();
  const { ledProjectIds, isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
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

  return (
    <QueryWrapper query={getProjectUserQuery ?? getProjectPublicQuery}>
      <div className="px-10 flex flex-col align-center items-center">
        {project && (
          <div className="flex flex-col w-11/12 my-3 gap-5">
            <Card>
              <div className="flex flex-col divide-white divide-solid divide-y-2">
                <div className="pb-5">
                  <ProjectInformation
                    name={project.name}
                    budget={getProjectUserQuery?.data?.projectsByPk?.budgets?.[0]}
                    details={{
                      description: project?.projectDetails?.description,
                      telegramLink: project?.projectDetails?.telegramLink,
                    }}
                  />
                </div>
                <div className="flex flex-row align-start pt-5 space-x-3">
                  {availableTabs.map((tab: ProjectDetailsTab) => (
                    <div
                      key={tab}
                      className={`border-solid border-white border-2 w-fit p-2 hover:cursor-pointer ${
                        selectedTab === tab ? "font-bold border-3" : "opacity-70"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            {selectedTab === ProjectDetailsTab.Overview &&
              githubRepo?.content?.readme?.content &&
              githubRepo.content?.contributors && (
                <Overview
                  decodedReadme={decodeBase64ToString(githubRepo.content.readme.content)}
                  contributors={githubRepo.content?.contributors}
                  repo={{ name: githubRepo.name, owner: githubRepo.owner }}
                />
              )}
            {selectedTab === ProjectDetailsTab.Payments && (
              <Payments budget={getProjectUserQuery?.data?.projectsByPk?.budgets?.[0]} />
            )}
          </div>
        )}
      </div>
    </QueryWrapper>
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
      }
    }
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
      }
      githubRepo {
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;
