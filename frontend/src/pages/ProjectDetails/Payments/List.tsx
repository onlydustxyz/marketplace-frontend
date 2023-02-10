import { Suspense, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProjectPaymentsRoutePaths } from "src/App";
import Card from "src/components/Card";
import Loader from "src/components/Loader";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import RemainingBudget from "src/pages/ProjectDetails/Payments/RemainingBudget";
import {
  PaymentAction,
  ProjectDetailsActionType,
  ProjectDetailsDispatchContext,
} from "src/pages/ProjectDetails/ProjectDetailsContext";
import { Sortable } from "src/types";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";
import { PaymentRequestFragment } from "src/__generated/graphql";

type Props = {
  payments?: (PaymentRequestFragment & Sortable)[];
  budget?: { initialAmount: number; remainingAmount: number };
};

const PaymentList: React.FC<Props> = props => {
  const dispatch__deprecated = useContext(ProjectDetailsDispatchContext);
  const navigate = useNavigate();
  const outletContext = useOutletContext<{
    payments: (PaymentRequestFragment & Sortable)[];
    budget: { initialAmount: number; remainingAmount: number };
  }>();
  const { payments = outletContext.payments, budget = outletContext.budget } = props;
  const sidebarUrlsEnabled = isFeatureEnabled(FeatureFlags.PROJECT_SIDEBAR_URLS);
  const navigateToNewPayment = () => {
    if (sidebarUrlsEnabled) {
      navigate(ProjectPaymentsRoutePaths.New);
    } else {
      dispatch__deprecated({
        type: ProjectDetailsActionType.SelectPaymentAction,
        selectedPaymentAction: PaymentAction.Send,
      });
    }
  };

  return (
    <div className="flex flex-row items-start gap-5 h-full">
      <div className="flex basis-2/3">
        {payments.length > 0 ? (
          <Card>
            <Suspense fallback={<Loader />}>
              <PaymentTable payments={payments} />
            </Suspense>
          </Card>
        ) : (
          <Card className="p-16">
            <ProjectPaymentTableFallback onClick={navigateToNewPayment} />
          </Card>
        )}
      </div>
      <div className="flex basis-1/3">
        <RemainingBudget
          budget={budget}
          disabled={budget.remainingAmount === 0 || payments.length === 0}
          onClickNewPayment={navigateToNewPayment}
        />
      </div>
    </div>
  );
};

export default PaymentList;
