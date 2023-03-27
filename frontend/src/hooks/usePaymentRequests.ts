import { gql } from "@apollo/client";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { parsePullRequestOrIssueLink } from "src/utils/github";
import {
  GetPaymentRequestsForProjectQuery,
  PaymentRequestFragment,
  PaymentRequestFragmentDoc,
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

      const newPaymentRequestRef = cache.writeFragment<PaymentRequestFragment>({
        fragment: PaymentRequestFragmentDoc,
        data: {
          __typename: "PaymentRequests",
          id: data?.requestPayment,
          amountInUsd: amount,
          recipientId: contributorId,
          workItems:
            reason.workItems?.map(url => {
              const { repoOwner, repoName, issueNumber } = parsePullRequestOrIssueLink(url);
              return {
                repoOwner,
                repoName,
                issueNumber,
              };
            }) || [],
          payments: [],
          requestedAt: Date.now(),
        },
      });

      cache.modify({
        id: `Projects:${projectId}`,
        fields: {
          budgets: budgetRefs => {
            cache.modify({
              id: budgetRefs[0].__ref,
              fields: {
                paymentRequests: paymentRequestRefs => {
                  return [...paymentRequestRefs, newPaymentRequestRef];
                },
                remainingAmount: remainingAmount => remainingAmount - amount,
              },
            });
            return budgetRefs;
          },
        },
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
    workItems {
      repoOwner
      repoName
      issueNumber
    }
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
