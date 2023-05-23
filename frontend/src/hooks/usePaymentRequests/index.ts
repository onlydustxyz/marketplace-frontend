import {
  CancelPaymentRequestMutationResult,
  ExtendedPaymentRequestFragment,
  ExtendedPaymentRequestFragmentDoc,
  RequestPaymentMutationOptions,
  RequestPaymentMutationResult,
  RequestPaymentMutationVariables,
  useCancelPaymentRequestMutation,
  useGetPaymentRequestsForProjectQuery,
  useRequestPaymentMutation,
} from "src/__generated/graphql";
import { reject } from "lodash";
import { ContributorFragment } from "src/types";

export default function usePaymentRequests(projectId?: string) {
  const getPaymentRequestsQuery = useGetPaymentRequestsForProjectQuery({
    variables: { projectId },
    skip: !projectId,
    nextFetchPolicy: "cache-only",
  });

  const [requestNewPaymentMutation, { loading: requestNewPaymentMutationLoading }] = useRequestPaymentMutation();

  const [cancelPaymentRequest] = useCancelPaymentRequestMutation({
    context: { graphqlErrorDisplay: "toaster" },
    update: (cache, result) => {
      const { budgetId, paymentId, amount } =
        (result as CancelPaymentRequestMutationResult).data?.cancelPaymentRequest || {};

      cache.modify({
        id: `Budgets:${budgetId}`,
        fields: {
          paymentRequests: current => reject(current, { __ref: `PaymentRequests:${paymentId}` }),
          remainingAmount: remainingAmount => remainingAmount + amount,
        },
      });

      cache.evict({
        id: `PaymentRequests:${paymentId}`,
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

    requestNewPayment: (recipient: ContributorFragment, options: RequestPaymentMutationOptions) =>
      requestNewPaymentMutation({
        ...options,
        context: { graphqlErrorDisplay: "toaster" },
        update: (cache, result, { variables }) => {
          const { budgetId, paymentId, amount } = (result as RequestPaymentMutationResult).data?.requestPayment || {};
          const { contributorId, reason } = variables as RequestPaymentMutationVariables;

          const newPaymentRequestRef = cache.writeFragment<ExtendedPaymentRequestFragment>({
            fragment: ExtendedPaymentRequestFragmentDoc,
            fragmentName: "ExtendedPaymentRequest",
            data: {
              __typename: "PaymentRequests",
              id: paymentId,
              amountInUsd: amount,
              recipientId: contributorId,
              workItemsAggregate: { aggregate: { count: reason.workItems.length } },
              paymentsAggregate: { aggregate: { sum: { amount: 0 } } },
              requestedAt: Date.now(),
              githubRecipient: {
                ...recipient,
                __typename: "GithubUsers",
              },
            },
          });

          cache.modify({
            id: `Budgets:${budgetId}`,
            fields: {
              paymentRequests: paymentRequestRefs => [...paymentRequestRefs, newPaymentRequestRef],
              remainingAmount: remainingAmount => remainingAmount - amount,
            },
          });

          cache.modify({
            id: `GithubUsers:${recipient.id}`,
            fields: {
              paymentRequests: paymentRequestRefs => [...paymentRequestRefs, newPaymentRequestRef],
            },
          });

          cache.modify({
            id: cache.identify({ __typename: "AuthGithubUsers", userId: recipient.user?.id }),
            fields: {
              paymentRequests: paymentRequestRefs => [...paymentRequestRefs, newPaymentRequestRef],
            },
          });
        },
      }),
    cancelPaymentRequest,
    requestNewPaymentMutationLoading,
  };
}
