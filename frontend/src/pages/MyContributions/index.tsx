import { gql } from "@apollo/client";
import Card from "src/components/Card";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import PaymentTableFallback from "src/components/PaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
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

  return (
    <QueryWrapper query={query}>
      <div className="mt-10">
        <Card>{hasPayments ? <PaymentTable payments={payments} /> : <PaymentTableFallback />}</Card>
      </div>
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
