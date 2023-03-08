import { gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import PayoutTable from "src/components/PayoutTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Currency, HasuraUserRole, PaymentStatus } from "src/types";
import { GetPaymentRequestsQuery, UserPaymentRequestFragment } from "src/__generated/graphql";
import { useT } from "talkr";
import TotalEarnings from "./TotalEarnings";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { Payment } from "src/components/PayoutTable/Line";
import InvoiceSubmission from "./InvoiceSubmission";

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

  const { valid: payoutSettingsValid, invoiceNeeded } = usePayoutSettings(githubUserId);

  const { data: paymentRequestsQueryData } = getPaymentRequestsQuery;
  const payments = paymentRequestsQueryData?.paymentRequests?.map(mapApiPaymentsToProps);
  const hasPayments = payments && payments.length > 0;
  const pendingPaymentsRequests = payments?.filter(p => p.status === PaymentStatus.WAITING_PAYMENT) || [];

  if (hasPayments === false) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  const totalEarnings = hasPayments && payments.reduce((acc, p) => acc + p.amount.value, 0);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="container mx-auto pt-16 h-full">
        <div className="text-5xl font-belwe">{T("navbar.payments")}</div>
        <QueryWrapper query={getPaymentRequestsQuery}>
          <div className="flex gap-4 mb-10">
            <Card>{payments && <PayoutTable payments={payments} payoutInfoMissing={!payoutSettingsValid} />}</Card>
            <div className="flex flex-col gap-4">
              {totalEarnings && <TotalEarnings amount={totalEarnings} />}
              {pendingPaymentsRequests.length > 0 && invoiceNeeded && (
                <InvoiceSubmission pendingPaymentRequestsCount={pendingPaymentsRequests.length} />
              )}
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
  const reason = apiPayment.reason?.work_items?.at(0);
  const requestedAt = apiPayment.requestedAt;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments?.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    requestedAt: requestedAt,
    amount,
    reason,
    project: project &&
      project?.projectDetails && {
        id: project.id,
        title: project.projectDetails.name,
        logoUrl: project.projectDetails.logoUrl,
      },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export const GET_PAYMENTS_QUERY = gql`
  fragment UserPaymentRequest on PaymentRequests {
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
          shortDescription
          logoUrl
        }
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
