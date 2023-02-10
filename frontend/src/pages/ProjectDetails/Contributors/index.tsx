import { gql } from "@apollo/client";
import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable, { CONTRIBUTORS_TABLE_FRAGMENT } from "src/components/ContributorsTable";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import { GetProjectContributorsQuery, GetProjectRemainingBudgetQuery } from "src/__generated/graphql";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useOutletContext } from "react-router-dom";

type PropsType = {
  projectId?: string;
};

const Contributors: React.FC<PropsType> = props => {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const outletContext: { projectId: string } = useOutletContext();
  const projectId = props.projectId ?? outletContext.projectId;

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

  const contributors = getProjectContributorsQuery.data?.projectsByPk?.githubRepo?.content.contributors || [];
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
          <ContributorsTableFallback projectName={getProjectContributorsQuery.data?.projectsByPk?.name} />
        )}
      </div>
    </QueryWrapper>
  );
};

export const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  ${CONTRIBUTORS_TABLE_FRAGMENT}
  query GetProjectContributors($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      name
      githubRepo {
        id
        content {
          id
          contributors {
            ...ContributorsTableFields
          }
        }
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
