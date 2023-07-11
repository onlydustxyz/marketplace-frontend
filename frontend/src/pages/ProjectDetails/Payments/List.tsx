import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "src/components/Card";
import Loader from "src/components/Loader";
import PaymentTable from "src/components/PaymentTable";
import ProjectPaymentTableFallback from "src/components/ProjectPaymentTableFallback";
import { useIntl } from "src/hooks/useIntl";
import RemainingBudget from "src/pages/ProjectDetails/Payments/RemainingBudget";
import { Sortable } from "src/types";
import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import Title from "src/pages/ProjectDetails/Title";

const PaymentList: React.FC = () => {
  const { projectId, payments, budget } = useOutletContext<{
    projectId: string;
    payments: (ExtendedPaymentRequestFragment & Sortable)[];
    budget: { initialAmount: number; remainingAmount: number };
  }>();

  const { T } = useIntl();

  return (
    <>
      <Title>{T("project.details.payments.title")}</Title>
      <div className="flex h-full flex-col-reverse items-start gap-4 xl:flex-row">
        <div className="flex w-full basis-2/3">
          {payments.length > 0 ? (
            <Card>
              <Suspense fallback={<Loader />}>
                <PaymentTable payments={payments} projectId={projectId} />
              </Suspense>
            </Card>
          ) : (
            <Card className="p-16">
              <ProjectPaymentTableFallback disabled={budget.initialAmount === 0 || budget.remainingAmount === 0} />
            </Card>
          )}
        </div>
        <div className="flex w-full basis-1/3">
          <RemainingBudget budget={budget} disabled={budget.remainingAmount === 0 || payments.length === 0} />
        </div>
      </div>
    </>
  );
};

export default PaymentList;
