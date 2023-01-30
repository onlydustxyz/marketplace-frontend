import { gql, QueryResult } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import PayoutTable, { mapApiPaymentsToProps } from "src/components/PayoutTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import isPayoutInfoMissing from "src/utils/isPayoutInfoMissing";
import { GetPaymentRequestsQuery, PayoutSettingsQuery } from "src/__generated/graphql";
import { useT } from "talkr";
import InfoMissingBanner from "src/components/InfoMissingBanner";
import Button from "src/components/Button";
import TotalEarnings from "./TotalEarnings";
import Background from "src/components/Background";

const MyContributions = () => {
  const { githubUserId } = useAuth();
  const { T } = useT();

  const getPaymentRequestsQuery = useHasuraQuery<GetPaymentRequestsQuery>(
    GET_MY_CONTRIBUTIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { githubUserId },
      skip: !githubUserId,
    }
  );
  const getPayoutSettingsQuery = useHasuraQuery<PayoutSettingsQuery>(
    GET_PAYOUT_SETTINGS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      fetchPolicy: "network-only",
    }
  );

  const { data: paymentRequestsQueryData } = getPaymentRequestsQuery;
  const payments = paymentRequestsQueryData?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasPayments = payments && payments.length > 0;

  if (hasPayments === false) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  const totalEarnings = hasPayments && payments.reduce((acc, p) => acc + p.amount.value, 0);
  const payoutInfoMissing = !!isPayoutInfoMissing(getPayoutSettingsQuery);

  return (
    <Background>
      <div className="container mx-auto pt-16 h-full">
        <div className="text-5xl font-belwe">{T("navbar.myContributions")}</div>
        <QueryWrapper query={getPaymentRequestsQuery}>
          <div className="my-10">
            {payoutInfoMissing && hasPendingPaymentsRequests(getPaymentRequestsQuery) && (
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
            <Card>{payments && <PayoutTable payments={payments} payoutInfoMissing={payoutInfoMissing} />}</Card>
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

export const GET_MY_CONTRIBUTIONS_QUERY = gql`
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

export const GET_PAYOUT_SETTINGS_QUERY = gql`
  query PayoutSettings {
    userInfo {
      payoutSettings
    }
  }
`;

export default MyContributions;
