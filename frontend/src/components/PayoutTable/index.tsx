import { Currency, Payment, PaymentStatus, Sortable } from "src/types";
import Table from "../Table";
import usePaymentSorting, { SortingFields } from "src/hooks/usePaymentSorting";
import PaymentLine from "./Line";
import Headers from "./Headers";
import { useMemo, useState } from "react";

type PropsType = {
  payments: (Payment & Sortable)[];
  payoutInfoMissing: boolean;
};

const PayoutTable: React.FC<PropsType> = ({ payments, payoutInfoMissing }) => {
  const [paymentSortingFields, setPaymentSortingFields] = useState<Record<string, SortingFields>>({});
  const { sort, sorting, applySorting } = usePaymentSorting();

  const sortablePayments = useMemo(
    () => payments.map(p => ({ ...p, sortingFields: paymentSortingFields[p.id] })),
    [paymentSortingFields]
  );

  const sortedPayments = useMemo(() => sort(sortablePayments), [sort, sortablePayments]);

  return (
    <Table id="payment_table" headers={<Headers sorting={sorting} applySorting={applySorting} />}>
      {sortedPayments.map(p => (
        <PaymentLine
          key={p.id}
          payment={p}
          payoutInfoMissing={payoutInfoMissing}
          setSortingFields={fields => setPaymentSortingFields(existing => ({ ...existing, [p.id]: fields }))}
        />
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
      title: project.projectDetails.name,
      shortDescription: project.projectDetails.shortDescription,
      logoUrl: project.projectDetails.logoUrl,
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export default PayoutTable;
