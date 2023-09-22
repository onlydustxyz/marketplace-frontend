import { gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import UserRewardTable from "src/components/UserRewardTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { Currency, PaymentStatus } from "src/types";
import { UserPaymentRequestFragment, useGetPaymentRequestsQuery } from "src/__generated/graphql";
import { useT } from "talkr";
import TotalEarnings from "./TotalEarnings";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { Reward } from "src/components/UserRewardTable/Line";
import InvoiceSubmission from "./InvoiceSubmission";
import SEO from "src/components/SEO";

const Rewards = () => {
  const { githubUserId } = useAuth();
  const { T } = useT();

  const getPaymentRequestsQuery = useGetPaymentRequestsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  const { valid: payoutSettingsValid, invoiceNeeded, data: userInfos } = usePayoutSettings(githubUserId);

  const { data: paymentRequestsQueryData } = getPaymentRequestsQuery;
  const rewards = paymentRequestsQueryData?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasRewards = rewards && rewards.length > 0;
  const paymentRequestsNeedingInvoice =
    rewards?.filter(p => p.status === PaymentStatus.WAITING_PAYMENT && !p.invoiceReceived) || [];

  if (hasRewards === false) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  const totalEarnings = hasRewards && rewards.reduce((acc, p) => acc + p.amount.value, 0);
  const invoiceSubmissionNeeded =
    paymentRequestsNeedingInvoice.length > 0 && invoiceNeeded && githubUserId && userInfos && payoutSettingsValid;

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
          <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
          <QueryWrapper query={getPaymentRequestsQuery}>
            <div className="mb-10 flex flex-col-reverse items-start gap-4 xl:flex-row">
              <Card>
                {rewards && (
                  <UserRewardTable
                    rewards={rewards}
                    payoutInfoMissing={!payoutSettingsValid}
                    invoiceNeeded={invoiceNeeded}
                  />
                )}
              </Card>
              <div>
                <div className="sticky top-4 flex flex-col gap-4">
                  {totalEarnings && <TotalEarnings amount={totalEarnings} />}
                  {invoiceSubmissionNeeded && (
                    <InvoiceSubmission
                      paymentRequests={paymentRequestsNeedingInvoice}
                      githubUserId={githubUserId}
                      userInfos={userInfos}
                    />
                  )}
                </div>
              </div>
            </div>
          </QueryWrapper>
        </div>
      </Background>
    </>
  );
};

const mapApiPaymentsToProps = (apiPayment: UserPaymentRequestFragment): Reward => {
  const amount = { value: apiPayment.amount, currency: Currency.USD };
  const project = apiPayment.project;
  const requestedAt = apiPayment.requestedAt;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments?.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    requestedAt,
    amount,
    workItems: apiPayment.workItems,
    project: project &&
      project && {
        id: project.id,
        title: project.name,
        logoUrl: project.logoUrl,
      },
    invoiceReceived: !!apiPayment.invoiceReceivedAt,
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amount ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT,
  };
};

gql`
  fragment UserPaymentRequest on PaymentRequests {
    id
    requestedAt
    payments {
      amount
      currencyCode
    }
    amount
    workItems {
      ...WorkItem
    }
    invoiceReceivedAt
    project {
      id
      name
      shortDescription
      logoUrl
    }
  }

  query GetPaymentRequests($githubUserId: bigint!) {
    paymentRequests(where: { recipientId: { _eq: $githubUserId } }) {
      ...UserPaymentRequest
    }
  }
`;

export default Rewards;
