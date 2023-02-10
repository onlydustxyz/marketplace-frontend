import { useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import QueryWrapper from "src/components/QueryWrapper";
import { useIntl } from "src/hooks/useIntl";
import usePaymentRequests from "src/hooks/usePaymentRequests";
import PaymentList from "src/pages/ProjectDetails/Payments/List";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";
import { PaymentAction, ProjectDetailsContext } from "../ProjectDetailsContext";
import PaymentForm from "./PaymentForm";

interface PaymentsProps {
  projectId?: string;
}

const Payments: React.FC<PaymentsProps> = props => {
  const { T } = useIntl();

  const state = useContext(ProjectDetailsContext);
  const parentOutletContext = useOutletContext<{ projectId: string }>();

  const { projectId = parentOutletContext.projectId } = props;
  const query = usePaymentRequests({ projectId });
  const payments = query.data?.paymentRequests || [];
  const budget = query.data?.budget || { initialAmount: 0, remainingAmount: 0 };
  const sidebarUrlsEnabled = isFeatureEnabled(FeatureFlags.PROJECT_SIDEBAR_URLS);

  const outletContext = {
    payments,
    budget,
    projectId,
  };

  return (
    <QueryWrapper query={query}>
      <div className="flex flex-col gap-8 mt-3 h-full">
        <div className="text-3xl font-belwe">{T("project.details.payments.title")}</div>
        {sidebarUrlsEnabled && <Outlet context={outletContext} />}
        {!sidebarUrlsEnabled && (
          <>
            {state.paymentAction === PaymentAction.List && <PaymentList payments={payments} budget={budget} />}
            {state.paymentAction === PaymentAction.Send && <PaymentForm {...{ projectId, budget }} />}
          </>
        )}
      </div>
    </QueryWrapper>
  );
};

export default Payments;
