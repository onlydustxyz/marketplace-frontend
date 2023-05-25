import { Outlet, useOutletContext } from "react-router-dom";
import usePaymentRequests from "src/hooks/usePaymentRequests";

export default function Payments() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const {
    data: { budget, paymentRequests: payments },
  } = usePaymentRequests(projectId);

  return (
    <Outlet
      context={{
        payments,
        budget,
        projectId,
      }}
    />
  );
}
