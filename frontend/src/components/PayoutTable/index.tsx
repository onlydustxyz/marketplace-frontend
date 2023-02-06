import { Currency, Payment, PaymentStatus } from "src/types";
import Table from "../Table";
import usePaymentSorting from "src/hooks/usePaymentSorting";
import PaymentLine from "./Line";
import Headers from "./Headers";

type PropsType = {
  payments: Payment[];
  payoutInfoMissing: boolean;
};

const PayoutTable: React.FC<PropsType> = ({ payments, payoutInfoMissing }) => {
  const { sortedPayments, sorting, applySorting } = usePaymentSorting(payments);

  return (
    <Table id="payment_table" headers={<Headers sorting={sorting} applySorting={applySorting} />}>
      {sortedPayments.map(p => (
        <PaymentLine payment={p} payoutInfoMissing={payoutInfoMissing} />
      ))}
    </Table>
  );
};

// TODO: replace this any with GraphQL-generated ts types
export const mapApiPaymentsToProps = (apiPayment: any): Payment => {
  const amount = { value: apiPayment.amountInUsd, currency: Currency.USD };
  const project = apiPayment.budget.project;
  const reason = apiPayment.reason?.work_items?.at(0);
  const requestedAt = apiPayment.requestedAt;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    requestedAt: requestedAt,
    amount,
    reason,
    project: {
      id: project.id,
      title: project.name,
      description: project.projectDetails.description,
      logoUrl: project.projectDetails.logoUrl || project.githubRepo?.content?.logoUrl,
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export default PayoutTable;
