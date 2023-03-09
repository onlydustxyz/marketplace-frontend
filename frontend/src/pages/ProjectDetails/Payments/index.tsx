import { Outlet, useOutletContext } from "react-router-dom";
import QueryWrapper from "src/components/QueryWrapper";
import usePaymentRequests from "src/hooks/usePaymentRequests";

const Payments: React.FC = () => {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const query = usePaymentRequests({ projectId });
  const payments = query.data?.paymentRequests || [];
  const budget = query.data?.budget || { initialAmount: 0, remainingAmount: 0 };

  const outletContext = {
    payments,
    budget,
    projectId,
  };

  return (
    <QueryWrapper query={query}>
      <div className="flex flex-col gap-8 mt-3 h-full">
        <Outlet context={outletContext} />
      </div>
    </QueryWrapper>
  );
};

export default Payments;
