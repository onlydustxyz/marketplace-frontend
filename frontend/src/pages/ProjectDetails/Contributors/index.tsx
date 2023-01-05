import { gql } from "@apollo/client";
import Card from "src/components/Card";
import ContributorsTable from "src/components/ContributorsTable";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { Contributor, HasuraUserRole } from "src/types";
import { GetProjectContributorsQuery } from "src/__generated/graphql";

type PropsType = {
  projectId: string;
};

const Contributors: React.FC<PropsType> = ({ projectId }) => {
  const { T } = useIntl();

  const { data } = useHasuraQuery<GetProjectContributorsQuery>(GET_PROJECT_CONTRIBUTORS_QUERY, HasuraUserRole.Public, {
    variables: { projectId },
  });

  return (
    <div className="flex flex-col gap-8 mt-3">
      <div className="text-3xl font-alfreda">{T("project.details.contributors.title")}</div>
      <div className="flex flex-row items-start gap-5">
        <div className="flex basis-1/4 flex-1">
          <Card>
            {data?.paymentRequests && (
              <ContributorsTable contributors={mapApiPaymentRequestsToContributors(data?.paymentRequests)} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

const mapApiPaymentRequestsToContributors = (paymentRequests: any) => {
  const contributors: Map<string, Contributor> = new Map();
  paymentRequests.forEach((payment: any) => {
    const login = payment.githubRecipient.login;

    const contributor: Contributor = {
      avatarUrl: payment.githubRecipient.avatarUrl,
      login,
      contributionsLeftToPay: 0,
      isRegistered: !!payment.recipient,
      paidContributions: (contributors.get(login)?.paidContributions || 0) + (payment.reason.work_items?.length || 0),
      totalEarned: (contributors.get(login)?.totalEarned || 0) + payment.amountInUsd,
    };

    contributors.set(login, contributor);
  });

  return Array.from(contributors.values());
};

export const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  query GetProjectContributors($projectId: uuid) {
    paymentRequests(where: { budget: { projectId: { _eq: $projectId } } }) {
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
`;

export default Contributors;
