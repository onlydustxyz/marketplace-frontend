import { gql } from "@apollo/client";
import { useState } from "react";
import Card from "src/components/Card";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
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
          <div className="flex w-3/4">
            <Card>
              {action === Action.Submit && <PaymentForm budget={budget} />}
              {action === Action.List && <PaymentTableQueryContainer budgetId={budget.id} />}
            </Card>
          </div>
          <div className="flex w-1/4">
            <Card>
              <div className="flex flex-col gap-10 items-stretch">
                <RemainingBudget remainingAmount={budget.remainingAmount} initialAmount={budget.initialAmount} />
                <div
                  className="flex border-solid border-white border-2 w-fit p-2 hover:cursor-pointer"
                  onClick={() => setAction(action === Action.List ? Action.Submit : Action.List)}
                >
                  {T(action === Action.List ? "payment.form.submit" : "payment.list")}
                </div>
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
}

function PaymentTableQueryContainer({ budgetId }: PaymentTableQueryContainerProps) {
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
  const { T } = useIntl();

  return (
    <QueryWrapper query={query}>
      {hasPayments ? <PaymentTable payments={payments} /> : <p>{T("contributions.empty")}</p>}
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
      budget {
        project {
          id
          name
          projectDetails {
            description
          }
        }
      }
    }
  }
`;
