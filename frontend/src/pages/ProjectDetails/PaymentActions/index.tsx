import { gql } from "@apollo/client";
import { useState } from "react";
import Card from "src/components/Card";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import RemainingBudget from "src/components/RemainingBudget";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import { GetPaymentRequestsForBudgetIdQuery } from "src/__generated/graphql";
import PaymentForm from "./PaymentForm";

enum Action {
  List = "List",
  Submit = "Submit",
}

interface PaymentsProps {
  budget?: {
    remainingAmount: number;
    initialAmount: number;
    id: string;
  };
}
export default function PaymentActions({ budget }: PaymentsProps) {
  const { T } = useIntl();

  const [action, setAction] = useState<Action>(Action.List);

  return (
    <>
      {budget && (
        <div className="flex flex-row items-start gap-5">
          <div className="flex w-2/3">
            {action === Action.Submit && <PaymentForm budget={budget} />}
            {action === Action.List && (
              <PaymentTableQueryContainer budgetId={budget.id} onClickSendPayment={() => setAction(Action.Submit)} />
            )}
          </div>
          <div className="flex w-1/3">
            <Card>
              <div className="flex flex-col gap-10 items-stretch">
                <RemainingBudget remainingAmount={budget.remainingAmount} initialAmount={budget.initialAmount} />
                {budget.remainingAmount > 0 && (
                  <div
                    className="bg-neutral-50 rounded-xl w-fit p-3 hover:cursor-pointer text-black"
                    onClick={() => setAction(action === Action.List ? Action.Submit : Action.List)}
                  >
                    {T(action === Action.List ? "payment.form.submit" : "payment.list")}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

interface PaymentTableQueryContainerProps {
  budgetId: string;
  onClickSendPayment: () => void;
}

function PaymentTableQueryContainer({ budgetId, onClickSendPayment }: PaymentTableQueryContainerProps) {
  const query = useHasuraQuery<GetPaymentRequestsForBudgetIdQuery>(
    GET_BUDGET_PAYMENTS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { budgetId },
    }
  );
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps) ?? null;
  const hasPayments = payments && payments.length > 0;

  return (
    <QueryWrapper query={query}>
      <Card>
        {hasPayments ? (
          <PaymentTable payments={payments} />
        ) : (
          <ProjectPaymentTableFallback onClick={onClickSendPayment} />
        )}
      </Card>
    </QueryWrapper>
  );
}

export const GET_BUDGET_PAYMENTS_QUERY = gql`
  query GetPaymentRequestsForBudgetId($budgetId: uuid!) {
    paymentRequests(where: { budgetId: { _eq: $budgetId } }) {
      id
      payments {
        amount
        currencyCode
      }
      amountInUsd
      reason
      budget {
        project {
          id
          name
          projectDetails {
            description
            logoUrl
          }
          githubRepo {
            content {
              logoUrl
            }
          }
        }
      }
    }
  }
`;
