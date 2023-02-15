import { gql, QueryResult } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import PayoutTable, { mapApiPaymentsToProps } from "src/components/PayoutTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetPaymentRequestsQuery } from "src/__generated/graphql";
import { useT } from "talkr";
import InfoMissingBanner from "src/components/InfoMissingBanner";
import Button from "src/components/Button";
import TotalEarnings from "./TotalEarnings";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import usePayoutSettings from "src/hooks/usePayoutSettings";

const Payments = () => {
  const { githubUserId } = useAuth();
  const { T } = useT();

  const getPaymentRequestsQuery = useHasuraQuery<GetPaymentRequestsQuery>(
    GET_PAYMENTS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { githubUserId },
      skip: !githubUserId,
    }
  );

  const { valid: payoutSettingsValid } = usePayoutSettings(githubUserId);

  const { data: paymentRequestsQueryData } = getPaymentRequestsQuery;
  const payments = paymentRequestsQueryData?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasPayments = payments && payments.length > 0;

  if (hasPayments === false) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  const totalEarnings = hasPayments && payments.reduce((acc, p) => acc + p.amount.value, 0);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="container mx-auto pt-16 h-full">
        <div className="text-5xl font-belwe">{T("navbar.payments")}</div>
        <QueryWrapper query={getPaymentRequestsQuery}>
          <div className="my-10">
            {!payoutSettingsValid && hasPendingPaymentsRequests(getPaymentRequestsQuery) && (
              <InfoMissingBanner>
                <Link to={RoutePaths.Profile}>
                  <Button>
                    <div>{T("profile.missing.button")}</div>
                  </Button>
                </Link>
              </InfoMissingBanner>
            )}
          </div>
          <div className="flex gap-4 mb-10">
            <Card>{payments && <PayoutTable payments={payments} payoutInfoMissing={!payoutSettingsValid} />}</Card>
            {totalEarnings && <TotalEarnings amount={totalEarnings} />}
          </div>
        </QueryWrapper>
      </div>
    </Background>
  );
};

function hasPendingPaymentsRequests(queryResult: QueryResult<GetPaymentRequestsQuery>) {
  return !!queryResult?.data?.paymentRequests?.length;
}

export const GET_PAYMENTS_QUERY = gql`
  query GetPaymentRequests($githubUserId: bigint!) {
    paymentRequests(where: { recipientId: { _eq: $githubUserId } }) {
      id
      requestedAt
      payments {
        amount
        currencyCode
      }
      amountInUsd
      reason
      budget {
        id
        project {
          id
          projectDetails {
            projectId
            name
            description
            logoUrl
          }
          githubRepo {
            id
            content {
              id
              logoUrl
            }
          }
        }
      }
    }
  }
`;

export default Payments;
