import { useContext } from "react";
import Card from "src/components/Card";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import RemainingBudget from "src/components/RemainingBudget";
import { useIntl } from "src/hooks/useIntl";
import {
  PaymentAction,
  ProjectDetailsActionType,
  ProjectDetailsContext,
  ProjectDetailsDispatchContext,
} from "../ProjectDetailsContext";
import PaymentForm from "./PaymentForm";
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
            <div className="flex basis-3/5 self-stretch">
              <Card>
                {payments.length > 0 ? (
                  <PaymentTable payments={payments} />
                ) : (
                  <ProjectPaymentTableFallback
                    onClick={() =>
                      dispatch({
                        type: ProjectDetailsActionType.SelectPaymentAction,
                        selectedPaymentAction: PaymentAction.Send,
                      })
                    }
                  />
                )}
              </Card>
            </div>
            <div className="flex basis-2/5">
              <Card>
                <div className="flex flex-col gap-10 items-stretch w-full">
                  <RemainingBudget {...budget} />
                  {budget.remainingAmount > 0 && (
                    <div
                      className="bg-neutral-50 rounded-xl w-fit p-3 hover:cursor-pointer text-black"
                      onClick={() =>
                        dispatch({
                          type: ProjectDetailsActionType.SelectPaymentAction,
                          selectedPaymentAction:
                            state.paymentAction === PaymentAction.List ? PaymentAction.Send : PaymentAction.List,
                        })
                      }
                    >
                      {T(state.paymentAction === PaymentAction.List ? "payment.form.submit" : "payment.list")}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
        {state.paymentAction === PaymentAction.Send && <PaymentForm {...{ projectId, budget }} />}
      </div>
    </QueryWrapper>
  );
}
