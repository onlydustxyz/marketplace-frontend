import { gql } from "@apollo/client";
import Card from "src/components/Card";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import PaymentTableFallback from "src/components/PaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetPaymentRequestsQuery } from "src/__generated/graphql";
import { useT } from "talkr";

const MyContributions = () => {
  const { githubUserId } = useAuth();
  const { T } = useT();
  const query = useHasuraQuery<GetPaymentRequestsQuery>(GET_MY_CONTRIBUTIONS_QUERY, HasuraUserRole.RegisteredUser, {
    variables: { githubId: githubUserId },
    context: {
      ignoreGraphQLErrors: true, // tell ApolloWrapper to ignore the errors
    },
  });
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasPayments = payments && payments.length > 0;

  return (
    <div className="container mx-auto pb-10">
      <div className="text-3xl font-alfreda mt-10">{T("navbar.myContributions")}</div>
      <QueryWrapper query={query}>
        <div className="mt-10">
          <Card>{hasPayments ? <PaymentTable payments={payments} /> : <PaymentTableFallback />}</Card>
        </div>
      </QueryWrapper>
    </div>
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
      reason
      budget {
        project {
          id
          name
          projectDetails {
            description
            logoUrl
          }
          githubRepo {
            content {
              logoUrl
            }
          }
        }
      }
    }
  }
`;

export default MyContributions;
