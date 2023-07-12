import { gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import PayoutTable from "src/components/PayoutTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { Currency, PaymentStatus } from "src/types";
import { UserPaymentRequestFragment, useGetPaymentRequestsQuery } from "src/__generated/graphql";
import { useT } from "talkr";
import TotalEarnings from "./TotalEarnings";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { Payment } from "src/components/PayoutTable/Line";
import InvoiceSubmission from "./InvoiceSubmission";

const Payments = () => {
  const { githubUserId } = useAuth();
  const { T } = useT();

  const getPaymentRequestsQuery = useGetPaymentRequestsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  const { valid: payoutSettingsValid, invoiceNeeded, data: userInfos } = usePayoutSettings(githubUserId);

  const { data: paymentRequestsQueryData } = getPaymentRequestsQuery;
  const payments = paymentRequestsQueryData?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasPayments = payments && payments.length > 0;
  const paymentRequestsNeedingInvoice =
    payments?.filter(p => p.status === PaymentStatus.WAITING_PAYMENT && !p.invoiceReceived) || [];

  if (hasPayments === false) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  const totalEarnings = hasPayments && payments.reduce((acc, p) => acc + p.amount.value, 0);
  const invoiceSubmissionNeeded =
    paymentRequestsNeedingInvoice.length > 0 && invoiceNeeded && githubUserId && userInfos && payoutSettingsValid;

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="container mx-auto flex h-full flex-col gap-6 px-4 pb-8 pt-8 xl:px-8 xl:pt-16">
        <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
        <QueryWrapper query={getPaymentRequestsQuery}>
          <div className="mb-10 flex flex-col-reverse gap-4 xl:flex-row">
            <Card>
              {payments && (
                <PayoutTable
                  payments={payments}
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
  );
};

const mapApiPaymentsToProps = (apiPayment: UserPaymentRequestFragment): Payment => {
  const amount = { value: apiPayment.amountInUsd, currency: Currency.USD };
  const project = apiPayment.budget?.project;
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
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
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
    amountInUsd
    workItems {
      ...WorkItem
    }
    invoiceReceivedAt
    budget {
      id
      project {
        id
        name
        shortDescription
        logoUrl
      }
    }
  }

  query GetPaymentRequests($githubUserId: bigint!) {
    paymentRequests(where: { recipientId: { _eq: $githubUserId } }) {
      ...UserPaymentRequest
    }
  }
`;

export default Payments;
