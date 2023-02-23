import { gql } from "@apollo/client";
import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable, { CONTRIBUTORS_TABLE_FRAGMENT } from "src/components/ContributorsTable";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import {
  ContributorsTableFieldsFragment,
  GetProjectContributorsQuery,
  GetProjectRemainingBudgetQuery,
  GithubRepoContributorsFieldsFragment,
} from "src/__generated/graphql";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useOutletContext } from "react-router-dom";

const Contributors: React.FC = () => {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const { projectId } = useOutletContext<{ projectId: string }>();

  const isProjectLeader = !!ledProjectIds.find(element => element === projectId);

  const getProjectContributorsQuery = useHasuraQuery<GetProjectContributorsQuery>(
    GET_PROJECT_CONTRIBUTORS_QUERY,
    HasuraUserRole.Public,
    {
      variables: { projectId },
    }
  );

  const getProjectRemainingBudget = useHasuraQuery<GetProjectRemainingBudgetQuery>(
    GET_PROJECT_REMAINING_BUDGET_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
      skip: !isProjectLeader,
    }
  );

  const contributors = getDeduplicatedAggregatedContributors(
    getProjectContributorsQuery.data?.projectsByPk?.githubRepos || []
  );
  const remainingBudget = getProjectRemainingBudget.data?.projectsByPk?.budgets.at(0)?.remainingAmount;

  return (
    <QueryWrapper query={getProjectContributorsQuery}>
      <div className="flex flex-col gap-6 mt-3 h-full">
        <div className="text-3xl font-belwe">{T("project.details.contributors.title")}</div>
        {contributors.length ? (
          <Card className="h-full">
            <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId }} />{" "}
          </Card>
        ) : (
          <ContributorsTableFallback
            projectName={getProjectContributorsQuery.data?.projectsByPk?.projectDetails?.name}
          />
        )}
      </div>
    </QueryWrapper>
  );
};

export const getDeduplicatedAggregatedContributors = function (
  githubRepos: GithubRepoContributorsFieldsFragment[]
): ContributorsTableFieldsFragment[] {
  const flatten_users = githubRepos
    .flatMap(repo => repo.githubRepoDetails?.content?.contributors)
    .flatMap(user => (user ? [user] : []));
  return [...new Set(flatten_users)];
};

export const GITHUB_REPO_CONTRIBUTORS_FRAGMENT = gql`
  ${CONTRIBUTORS_TABLE_FRAGMENT}
  fragment GithubRepoContributorsFields on ProjectGithubRepos {
    githubRepoId
    githubRepoDetails {
      id
      content {
        id
        contributors {
          ...ContributorsTableFields
        }
      }
    }
  }
`;

export const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  ${GITHUB_REPO_CONTRIBUTORS_FRAGMENT}
  query GetProjectContributors($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      projectDetails {
        projectId
        name
      }
      githubRepos {
        ...GithubRepoContributorsFields
      }
    }
  }
`;

export const GET_PROJECT_REMAINING_BUDGET_QUERY = gql`
  query GetProjectRemainingBudget($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      budgets {
        id
        remainingAmount
      }
    }
  }
`;

export default Contributors;
