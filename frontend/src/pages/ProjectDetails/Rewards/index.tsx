import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { Outlet, useOutletContext } from "react-router-dom";
import { GetPaymentRequestsForProjectDocument } from "src/__generated/graphql";
import { useOnProjectChange } from "src/providers/Commands";

export default function Rewards() {
  const { projectId, projectKey } = useOutletContext<{ projectId: string; projectKey: string }>();
  const { data, refetch } = useSuspenseQuery(GetPaymentRequestsForProjectDocument, {
    variables: { projectId },
  });

  useOnProjectChange(projectId, refetch);

  return (
    <Outlet
      context={{
        rewards: data.paymentRequests || [],
        budget: {
          initialAmount: data.budgetsAggregate.aggregate?.sum?.initialAmount,
          remainingAmount: data.budgetsAggregate.aggregate?.sum?.remainingAmount,
        },
        projectId,
        projectKey,
      }}
    />
  );
}
