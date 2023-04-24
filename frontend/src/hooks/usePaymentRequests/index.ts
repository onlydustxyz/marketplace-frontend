import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  GetPaymentRequestsForProjectDocument,
  GetPaymentRequestsForProjectQuery,
  PaymentRequestFragment,
  PaymentRequestFragmentDoc,
  RequestPaymentDocument,
  RequestPaymentMutationResult,
  RequestPaymentMutationVariables,
} from "src/__generated/graphql";

export default function usePaymentRequests(projectId: string) {
  const getPaymentRequestsQuery = useHasuraQuery<GetPaymentRequestsForProjectQuery>(
    GetPaymentRequestsForProjectDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  const [requestNewPayment] = useHasuraMutation(RequestPaymentDocument, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
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
          workItems: reason.workItems,
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
              broadcast: false,
              optimistic: true,
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
