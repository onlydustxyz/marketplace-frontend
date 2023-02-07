import { useContext } from "react";
import Card from "src/components/Card";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import { useIntl } from "src/hooks/useIntl";
import {
  PaymentAction,
  ProjectDetailsActionType,
  ProjectDetailsContext,
  ProjectDetailsDispatchContext,
} from "../ProjectDetailsContext";
import PaymentForm from "./PaymentForm";
import RemainingBudget from "./RemainingBudget";
import useGetPaymentRequests from "./useGetPaymentRequests";

interface PaymentsProps {
  projectId: string;
}

export default function PaymentActions({ projectId }: PaymentsProps) {
  const { T } = useIntl();

  const state = useContext(ProjectDetailsContext);
  const dispatch = useContext(ProjectDetailsDispatchContext);

  const query = useGetPaymentRequests(projectId);
  const payments = query.data?.paymentRequests || [];
  const budget = query.data?.budget || { initialAmount: 0, remainingAmount: 0 };

  return (
    <QueryWrapper query={query}>
      <div className="flex flex-col gap-8 mt-3 h-full">
        <div className="text-3xl font-belwe">{T("project.details.payments.title")}</div>
        {state.paymentAction === PaymentAction.List && (
          <div className="flex flex-row items-start gap-5 h-full">
            <div className="flex">
              {payments.length > 0 ? (
                <Card>
                  <PaymentTable payments={payments} />
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
            <div className="flex">
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
        )}
        {state.paymentAction === PaymentAction.Send && <PaymentForm {...{ projectId, budget }} />}
      </div>
    </QueryWrapper>
  );
}
