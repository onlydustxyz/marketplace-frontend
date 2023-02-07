import { gql } from "@apollo/client";
import { cloneDeep } from "lodash";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  GetPaymentRequestsForProjectQuery,
  PaymentRequestFragment,
  RequestPaymentMutationResult,
  RequestPaymentMutationVariables,
} from "src/__generated/graphql";

type Params = {
  projectId: string;
  onNewPaymentRequested?(): void;
};

export default function usePaymentRequests({ projectId, onNewPaymentRequested }: Params) {
  const getPaymentRequestsQuery = useHasuraQuery<GetPaymentRequestsForProjectQuery>(
    PAYMENT_REQUESTS_FOR_PROJECT_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  const [requestNewPayment] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
    onCompleted: () => onNewPaymentRequested && onNewPaymentRequested(),
    update: (cache, result, { variables }) => {
      const { data } = result as RequestPaymentMutationResult;
      const { amount, contributorId, projectId, reason } = variables as RequestPaymentMutationVariables;
      const cachedQuery: GetPaymentRequestsForProjectQuery | null = cache.readQuery({
        query: PAYMENT_REQUESTS_FOR_PROJECT_QUERY,
        variables: { projectId },
      });

      const newPaymentRequest: PaymentRequestFragment = {
        __typename: "PaymentRequests",
        id: data?.requestPayment,
        amountInUsd: amount,
        recipientId: contributorId,
        reason: { work_items: reason.workItems },
        payments: [],
        requestedAt: Date.now(),
      };

      const newQuery = cloneDeep(cachedQuery);
      const budget = newQuery?.projectsByPk?.budgets.at(0);
      if (budget) {
        budget.paymentRequests.push(newPaymentRequest);
        budget.remainingAmount -= amount;
      }

      cache.writeQuery({
        query: PAYMENT_REQUESTS_FOR_PROJECT_QUERY,
        data: newQuery,
        variables: { projectId },
      });
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
      paymentRequests: getPaymentRequestsQuery.data.projectsByPk?.budgets.map(b => b.paymentRequests).flat(),
    },
    requestNewPayment,
  };
}

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
  }
`;

export const PAYMENT_REQUESTS_FOR_PROJECT_QUERY = gql`
  ${PAYMENT_REQUEST_FRAGMENT}
  query GetPaymentRequestsForProject($projectId: uuid!) {
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
