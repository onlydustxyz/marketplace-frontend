import { Sortable } from "src/types";
import Table from "src/components/Table";
import usePaymentSorting, { SortingFields } from "src/hooks/usePaymentSorting";
import PaymentLine, { Payment } from "./Line";
import Headers from "./Headers";
import { useCallback, useMemo, useState } from "react";
import PaymentRequestSidePanel from "./PaymentRequestSidePanel";

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
    [paymentSortingFields, payments]
  );

  const sortedPayments = useMemo(() => sort(sortablePayments), [sort, sortablePayments]);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const setSortingFields = useCallback(
    (p: Payment) => (fields: SortingFields) => setPaymentSortingFields(existing => ({ ...existing, [p.id]: fields })),
    []
  );

  return (
    <>
      <Table id="payment_table" headers={<Headers sorting={sorting} applySorting={applySorting} />}>
        {sortedPayments.map(p => (
          <PaymentLine
            key={p.id}
            payment={p}
            payoutInfoMissing={payoutInfoMissing}
            invoiceNeeded={invoiceNeeded}
            setSortingFields={setSortingFields(p)}
            onClick={() => {
              setSelectedPayment(p);
              setSidePanelOpen(true);
            }}
          />
        ))}
      </Table>
      {selectedPayment && (
        <PaymentRequestSidePanel open={sidePanelOpen} setOpen={setSidePanelOpen} paymentId={selectedPayment.id} />
      )}
    </>
  );
};

export default PayoutTable;
