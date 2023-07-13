import { Sortable } from "src/types";
import Table from "src/components/Table";
import useRewardSorting, { SortingFields } from "src/hooks/useRewardSorting";
import Headers from "./Headers";
import PaymentLine from "./Line";
import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import { useMemo, useState } from "react";
import { PaymentRequestSidePanelAsLeader } from "src/components/PayoutTable/PaymentRequestSidePanel";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import MobilePaymentList from "./MobilePaymentList";

type Props = {
  projectId: string;
  payments: (ExtendedPaymentRequestFragment & Sortable)[];
};

export default function PaymentTable({ projectId, payments }: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [paymentSortingFields, setPaymentSortingFields] = useState<Record<string, SortingFields>>({});
  const { sort, sorting, applySorting } = useRewardSorting();

  const sortablePayments = useMemo(
    () => payments.map(p => ({ ...p, sortingFields: paymentSortingFields[p.id] })),
    [paymentSortingFields, payments]
  );

  const sortedPayments = useMemo(() => sort(sortablePayments), [sort, sortablePayments]);

  const [selectedPayment, setSelectedPayment] = useState<ExtendedPaymentRequestFragment | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const onPaymentClick = (payment: ExtendedPaymentRequestFragment) => {
    setSelectedPayment(payment);
    setSidePanelOpen(true);
  };

  return (
    <>
      {isXl ? (
        <Table id="payment_table" headers={<Headers {...{ sorting, applySorting }} />}>
          {sortedPayments.map(p => (
            <PaymentLine
              key={p.id}
              payment={p}
              setSortingFields={fields => setPaymentSortingFields(existing => ({ ...existing, [p.id]: fields }))}
              onClick={() => onPaymentClick(p)}
              selected={p.id === selectedPayment?.id}
            />
          ))}
        </Table>
      ) : (
        <MobilePaymentList payments={sortedPayments} onPaymentClick={onPaymentClick} />
      )}
      {selectedPayment && (
        <PaymentRequestSidePanelAsLeader
          projectId={projectId}
          open={sidePanelOpen}
          setOpen={setSidePanelOpen}
          paymentId={selectedPayment.id}
        />
      )}
    </>
  );
}
