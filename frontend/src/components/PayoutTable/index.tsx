import { Sortable } from "src/types";
import Table from "src/components/Table";
import usePaymentSorting, { SortingFields } from "src/hooks/usePaymentSorting";
import PaymentLine, { Payment } from "./Line";
import Headers from "./Headers";
import { useMemo, useState } from "react";

type PropsType = {
  payments: (Payment & Sortable)[];
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
};

const PayoutTable: React.FC<PropsType> = ({ payments, payoutInfoMissing, invoiceNeeded }) => {
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
          invoiceNeeded={invoiceNeeded}
          setSortingFields={fields => setPaymentSortingFields(existing => ({ ...existing, [p.id]: fields }))}
        />
      ))}
    </Table>
  );
};

export default PayoutTable;
