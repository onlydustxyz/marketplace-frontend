import { gql } from "@apollo/client";
import { useContext } from "react";
import Card from "src/components/Card";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { Currency, HasuraUserRole, PaymentStatus } from "src/types";
import { GetPaymentRequestsForProjectQuery } from "src/__generated/graphql";
import {
  PaymentAction,
  ProjectDetailsActionType,
  ProjectDetailsContext,
  ProjectDetailsDispatchContext,
} from "../ProjectDetailsContext";
import PaymentForm from "./PaymentForm";
import RemainingBudget from "./RemainingBudget";

interface PaymentsProps {
  projectId: string;
}

export default function PaymentActions({ projectId }: PaymentsProps) {
  const { T } = useIntl();

  const state = useContext(ProjectDetailsContext);
  const dispatch = useContext(ProjectDetailsDispatchContext);

  const query = useHasuraQuery<GetPaymentRequestsForProjectQuery>(
    GET_PAYMENT_REQUESTS_FOR_PROJECT,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  const budget = query.data?.projectsByPk?.budgets.reduce(
    (acc, b) => ({
      remainingAmount: acc.remainingAmount + b.remainingAmount,
      initialAmount: acc.initialAmount + b.initialAmount,
    }),
    { initialAmount: 0, remainingAmount: 0 }
  ) || { initialAmount: 0, remainingAmount: 0 };

  const payments = query.data?.projectsByPk?.budgets.map(b => b.paymentRequests).flat() || [];

  return (
    <QueryWrapper query={query}>
      <div className="flex flex-col gap-8 mt-3 h-full">
        <div className="text-3xl font-belwe">{T("project.details.payments.title")}</div>
        {state.paymentAction === PaymentAction.List && (
          <div className="flex flex-row items-start gap-5 h-full">
            <div className="flex basis-3/5 self-stretch">
              <Card>
                {payments.length > 0 ? (
                  <PaymentTable payments={payments.map(mapPaymentRequestsFromQuery)} />
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

const mapPaymentRequestsFromQuery = (paymentRequest: any) => {
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: paymentRequest.id,
    amount: { value: paymentRequest.amountInUsd, currency: Currency.USD },
    recipient: paymentRequest.githubRecipient,
    reason: paymentRequest.reason?.work_items?.at(0),
    status:
      getPaidAmount(paymentRequest.payments) === paymentRequest.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
    requestedAt: paymentRequest.requestedAt,
  };
};

export const GET_PAYMENT_REQUESTS_FOR_PROJECT = gql`
  query GetPaymentRequestsForProject($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      budgets {
        initialAmount
        remainingAmount
        paymentRequests {
          id
          githubRecipient {
            login
            avatarUrl
          }
          amountInUsd
          reason
          payments {
            amount
            currencyCode
          }
          requestedAt
        }
      }
    }
  }
`;
