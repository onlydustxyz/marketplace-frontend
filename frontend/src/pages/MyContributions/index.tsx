import { gql } from "@apollo/client";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { useUser } from "src/hooks/useUser";
import { HasuraUserRole } from "src/types";

const MyContributions = () => {
  const { githubId } = useUser();
  const query = useHasuraQuery(GET_MY_CONTRIBUTIONS_QUERY, HasuraUserRole.RegisteredUser, {
    variables: { userId: githubId },
  });
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps) ?? null;
  const hasPayments = payments && payments.length > 0;
  const { T } = useIntl();

  return (
    <QueryWrapper query={query}>
      {hasPayments ? <PaymentTable payments={payments} /> : <p>{T("contributions.empty")}</p>}
    </QueryWrapper>
  );
};

export const GET_MY_CONTRIBUTIONS_QUERY = gql`
  query GetPaymentRequests($userId: uuid!) {
    paymentRequests(where: { recipientId: { _eq: $userId } }) {
      id
      payments {
        amount
        currencyCode
      }
      amountInUsd
      budget {
        project {
          id
          name
          projectDetails {
            description
          }
        }
      }
    }
  }
`;

export default MyContributions;
