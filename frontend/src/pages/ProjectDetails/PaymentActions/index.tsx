import { gql } from "@apollo/client";
import { useState } from "react";
import Card from "src/components/Card";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import RemainingBudget from "src/components/RemainingBudget";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { Currency, HasuraUserRole, PaymentStatus } from "src/types";
import { GetPaymentRequestsForProjectQuery } from "src/__generated/graphql";
import PaymentForm from "./PaymentForm";

enum Action {
  List = "List",
  Submit = "Submit",
}

interface PaymentsProps {
  projectId: string;
}

export default function PaymentActions({ projectId }: PaymentsProps) {
  const { T } = useIntl();

  const [action, setAction] = useState<Action>(Action.List);

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
      <div className="flex flex-col gap-8 mt-3">
        <div className="text-3xl font-belwe">{T("project.details.payments.title")}</div>
        <div className="flex flex-row items-start gap-5">
          <div className="flex basis-2/3">
            {action === Action.Submit && <PaymentForm {...{ projectId, budget }} />}
            {action === Action.List && (
              <Card>
                {payments.length > 0 ? (
                  <PaymentTable payments={payments.map(mapPaymentRequestsFromQuery)} />
                ) : (
                  <ProjectPaymentTableFallback onClick={() => setAction(Action.Submit)} />
                )}
              </Card>
            )}
          </div>
          <div className="flex basis-1/3">
            <Card>
              <div className="flex flex-col gap-10 items-stretch w-full">
                <RemainingBudget {...budget} />
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
        }
      }
    }
  }
`;
