import { gql } from "@apollo/client";
import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable, { Contributor } from "src/components/ContributorsTable";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import { GetProjectContributorsQuery, GetProjectRemainingBudgetQuery } from "src/__generated/graphql";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";

type PropsType = {
  projectId: string;
};

const Contributors: React.FC<PropsType> = ({ projectId }) => {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();

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

  const paymentRequests = getProjectContributorsQuery.data?.projectsByPk?.budgets.at(0)?.paymentRequests;
  const remainingBudget = getProjectRemainingBudget.data?.projectsByPk?.budgets.at(0)?.remainingAmount;

  return (
    <QueryWrapper query={getProjectContributorsQuery}>
      <div className="flex flex-col gap-6 mt-3 h-full">
        <div className="text-3xl font-belwe">{T("project.details.contributors.title")}</div>
        <Card className="h-full">
          {paymentRequests?.length ? (
            <ContributorsTable
              contributors={mapApiPaymentRequestsToContributors(paymentRequests)}
              isProjectLeader={isProjectLeader}
              remainingBudget={remainingBudget}
            />
          ) : (
            <ContributorsTableFallback projectName={getProjectContributorsQuery.data?.projectsByPk?.name} />
          )}
        </Card>
      </div>
    </QueryWrapper>
  );
};

const mapApiPaymentRequestsToContributors = (paymentRequests: any) => {
  const contributors: Map<string, Contributor> = new Map();
  paymentRequests.forEach((payment: any) => {
    const login = payment.githubRecipient.login;

    const contributor: Contributor = {
      avatarUrl: payment.githubRecipient.avatarUrl,
      login,
      isRegistered: !!payment.recipient,
      paidContributions: (contributors.get(login)?.paidContributions || 0) + (payment.reason.work_items?.length || 0),
      totalEarned: (contributors.get(login)?.totalEarned || 0) + payment.amountInUsd,
    };

    contributors.set(login, contributor);
  });

  return Array.from(contributors.values());
};

export const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  query GetProjectContributors($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      name
      budgets {
        paymentRequests {
          reason
          amountInUsd
          recipient {
            userId
          }
          githubRecipient {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;

export const GET_PROJECT_REMAINING_BUDGET_QUERY = gql`
  query GetProjectRemainingBudget($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      budgets {
        remainingAmount
      }
    }
  }
`;

export default Contributors;
