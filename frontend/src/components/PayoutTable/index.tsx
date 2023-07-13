import { Sortable } from "src/types";
import Table from "src/components/Table";
import useRewardSorting, { SortingFields } from "src/hooks/useRewardSorting";
import PaymentLine, { Payment } from "./Line";
import Headers from "./Headers";
import { useCallback, useMemo, useState } from "react";
import PaymentRequestSidePanel from "./PaymentRequestSidePanel";
import { viewportConfig } from "src/config";
import MobilePayoutList from "./MobilePayoutList";
import { useMediaQuery } from "usehooks-ts";

type PropsType = {
  payments: (Payment & Sortable)[];
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
};

const PayoutTable: React.FC<PropsType> = ({ payments, payoutInfoMissing, invoiceNeeded }) => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [paymentSortingFields, setPaymentSortingFields] = useState<Record<string, SortingFields>>({});
  const { sort, sorting, applySorting } = useRewardSorting();

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

  const onPaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setSidePanelOpen(true);
  };

  return (
    <>
      {isXl ? (
        <Table id="reward_table" headers={<Headers sorting={sorting} applySorting={applySorting} />}>
          {sortedPayments.map(p => (
            <PaymentLine
              key={p.id}
              payment={p}
              payoutInfoMissing={payoutInfoMissing}
              invoiceNeeded={invoiceNeeded}
              setSortingFields={setSortingFields(p)}
              onClick={() => onPaymentClick(p)}
              selected={p.id === selectedPayment?.id}
            />
          ))}
        </Table>
      ) : (
        <MobilePayoutList
          payments={sortedPayments}
          payoutInfoMissing={payoutInfoMissing}
          invoiceNeeded={invoiceNeeded}
          onPaymentClick={onPaymentClick}
        />
      )}
      {selectedPayment && (
        <PaymentRequestSidePanel open={sidePanelOpen} setOpen={setSidePanelOpen} paymentId={selectedPayment.id} />
      )}
    </>
  );
};

export default PayoutTable;
