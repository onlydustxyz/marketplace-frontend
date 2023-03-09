import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "src/components/Card";
import Loader from "src/components/Loader";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import { useIntl } from "src/hooks/useIntl";
import RemainingBudget from "src/pages/ProjectDetails/Payments/RemainingBudget";
import { Sortable } from "src/types";
import { PaymentRequestFragment } from "src/__generated/graphql";

const PaymentList: React.FC = () => {
  const { payments, budget } = useOutletContext<{
    payments: (PaymentRequestFragment & Sortable)[];
    budget: { initialAmount: number; remainingAmount: number };
  }>();

  const { T } = useIntl();

  return (
    <>
      <div className="text-3xl font-belwe">{T("project.details.payments.title")}</div>
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
              <ProjectPaymentTableFallback disabled={budget.initialAmount === 0 || budget.remainingAmount === 0} />
            </Card>
          )}
        </div>
        <div className="flex basis-1/3">
          <RemainingBudget budget={budget} disabled={budget.remainingAmount === 0 || payments.length === 0} />
        </div>
      </div>
    </>
  );
};

export default PaymentList;
