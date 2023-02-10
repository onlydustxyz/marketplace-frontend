import { Suspense, useContext } from "react";
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
import { PaymentRequestFragment } from "src/__generated/graphql";

type Props = {
  payments: (PaymentRequestFragment & Sortable)[];
  budget: { initialAmount: number; remainingAmount: number };
};

const PaymentList: React.FC<Props> = ({ payments, budget }) => {
  const dispatch = useContext(ProjectDetailsDispatchContext);

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
            <ProjectPaymentTableFallback
              onClick={() =>
                dispatch({
                  type: ProjectDetailsActionType.SelectPaymentAction,
                  selectedPaymentAction: PaymentAction.Send,
                })
              }
            />
          </Card>
        )}
      </div>
      <div className="flex basis-1/3">
        <RemainingBudget
          budget={budget}
          disabled={budget.remainingAmount === 0 || payments.length === 0}
          onClickNewPayment={() =>
            dispatch({
              type: ProjectDetailsActionType.SelectPaymentAction,
              selectedPaymentAction: PaymentAction.Send,
            })
          }
        />
      </div>
    </div>
  );
};

export default PaymentList;
