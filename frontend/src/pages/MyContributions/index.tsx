import { gql } from "@apollo/client";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import { GetPaymentRequestsQuery } from "src/__generated/graphql";

const MyContributions = () => {
  const { githubUserId } = useAuth();
  const query = useHasuraQuery<GetPaymentRequestsQuery>(GET_MY_CONTRIBUTIONS_QUERY, HasuraUserRole.RegisteredUser, {
    variables: { githubId: githubUserId },
  });
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasPayments = payments && payments.length > 0;
  const { T } = useIntl();

  return (
    <QueryWrapper query={query}>
      {hasPayments ? <PaymentTable payments={payments} /> : <p>{T("contributions.empty")}</p>}
    </QueryWrapper>
  );
};

export const GET_MY_CONTRIBUTIONS_QUERY = gql`
  query GetPaymentRequests($githubId: bigint!) {
    paymentRequests(where: { recipientId: { _eq: $githubId } }) {
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
