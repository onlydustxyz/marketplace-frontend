import { useContext } from "react";
import QueryWrapper from "src/components/QueryWrapper";
import { useIntl } from "src/hooks/useIntl";
import usePaymentRequests from "src/hooks/usePaymentRequests";
import PaymentList from "src/pages/ProjectDetails/Payments/List";
import { PaymentAction, ProjectDetailsContext } from "../ProjectDetailsContext";
import PaymentForm from "./PaymentForm";

interface PaymentsProps {
  projectId: string;
}

export default function PaymentActions({ projectId }: PaymentsProps) {
  const { T } = useIntl();

  const state = useContext(ProjectDetailsContext);

  const query = usePaymentRequests({ projectId });
  const payments = query.data?.paymentRequests || [];
  const budget = query.data?.budget || { initialAmount: 0, remainingAmount: 0 };

  return (
    <QueryWrapper query={query}>
      <div className="flex flex-col gap-8 mt-3 h-full">
        <div className="text-3xl font-belwe">{T("project.details.payments.title")}</div>
        {state.paymentAction === PaymentAction.List && <PaymentList payments={payments} budget={budget} />}
        {state.paymentAction === PaymentAction.Send && <PaymentForm {...{ projectId, budget }} />}
      </div>
    </QueryWrapper>
  );
}
