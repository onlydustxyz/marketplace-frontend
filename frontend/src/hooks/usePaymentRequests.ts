import { gql } from "@apollo/client";
import { useHasuraMutation, useHasuraSubscription } from "src/hooks/useHasuraQuery";
import { Currency, HasuraUserRole, PaymentStatus } from "src/types";
import { OnNewPaymentRequestsSubscription, PaymentRequestFragment } from "src/__generated/graphql";

type Params = {
  projectId: string;
  onNewPaymentRequested?(): void;
};

export default function usePaymentRequests({ projectId, onNewPaymentRequested }: Params) {
  const getPaymentRequestsQuery = useHasuraSubscription<OnNewPaymentRequestsSubscription>(
    PAYMENT_REQUESTS_FOR_PROJECT_SUBSCRIPTION,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  const [requestNewPayment] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
    onCompleted: () => {
      onNewPaymentRequested && onNewPaymentRequested();
    },
  });

  return {
    ...getPaymentRequestsQuery,
    data: getPaymentRequestsQuery.data && {
      budget: getPaymentRequestsQuery.data.projectsByPk?.budgets.reduce(
        (acc, b) => ({
          remainingAmount: acc.remainingAmount + b.remainingAmount,
          initialAmount: acc.initialAmount + b.initialAmount,
        }),
        { initialAmount: 0, remainingAmount: 0 }
      ),
      paymentRequests: getPaymentRequestsQuery.data.projectsByPk?.budgets
        .map(b => b.paymentRequests)
        .flat()
        .map(toPaymentRequest),
    },
    requestNewPayment,
  };
}

const toPaymentRequest = (paymentRequest: PaymentRequestFragment) => {
  const paidAmount = paymentRequest.payments.reduce((total, payment) => total + payment.amount, 0);

  return {
    id: paymentRequest.id,
    amount: { value: paymentRequest.amountInUsd, currency: Currency.USD },
    recipientId: paymentRequest.recipientId,
    reason: paymentRequest.reason?.work_items?.at(0),
    status: paidAmount === paymentRequest.amountInUsd ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT,
    requestedAt: paymentRequest.requestedAt,
    recipientPayoutSettings: paymentRequest?.recipient?.user?.userInfo?.payoutSettings,
  };
};

const PAYMENT_REQUEST_FRAGMENT = gql`
  fragment PaymentRequest on PaymentRequests {
    id
    recipientId
    amountInUsd
    reason
    payments {
      amount
      currencyCode
    }
    requestedAt
    recipient {
      user {
        userInfo {
          payoutSettings
        }
      }
    }
  }
`;

export const PAYMENT_REQUESTS_FOR_PROJECT_SUBSCRIPTION = gql`
  ${PAYMENT_REQUEST_FRAGMENT}
  subscription OnNewPaymentRequests($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      budgets {
        id
        initialAmount
        remainingAmount
        paymentRequests {
          ...PaymentRequest
        }
      }
    }
  }
`;

export const REQUEST_PAYMENT_MUTATION = gql`
  mutation RequestPayment($amount: Int!, $contributorId: Int!, $projectId: Uuid!, $reason: Reason!) {
    requestPayment(amountInUsd: $amount, projectId: $projectId, reason: $reason, recipientId: $contributorId)
  }
`;
