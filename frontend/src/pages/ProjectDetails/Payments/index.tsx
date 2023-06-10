import { Outlet, useOutletContext } from "react-router-dom";
import { useGetPaymentRequestsForProjectQuery } from "src/__generated/graphql";
import { useOnProjectChange } from "src/providers/Commands";

export default function Payments() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const { data, refetch } = useGetPaymentRequestsForProjectQuery({
    variables: { projectId },
  });

  useOnProjectChange(projectId, refetch);

  return (
    <Outlet
      context={{
        payments: data?.paymentRequests || [],
        budget: {
          initialAmount: data?.budgetsAggregate.aggregate?.sum?.initialAmount,
          remainingAmount: data?.budgetsAggregate.aggregate?.sum?.remainingAmount,
        },
        projectId,
      }}
    />
  );
}
