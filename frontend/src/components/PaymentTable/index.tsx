import { Sortable } from "src/types";
import Table from "../Table";
import usePaymentSorting, { SortingFields } from "src/hooks/usePaymentSorting";
import Headers from "./Headers";
import PaymentLine from "./Line";
import { PaymentRequestFragment } from "src/__generated/graphql";
import { useMemo, useState } from "react";

type Props = {
  payments: (PaymentRequestFragment & Sortable)[];
};

export default function PaymentTable({ payments }: Props) {
  const [paymentSortingFields, setPaymentSortingFields] = useState<Record<string, SortingFields>>({});
  const { sort, sorting, applySorting } = usePaymentSorting();

  const sortablePayments = useMemo(
    () => payments.map(p => ({ ...p, sortingFields: paymentSortingFields[p.id] })),
    [paymentSortingFields]
  );

  const sortedPayments = useMemo(() => sort(sortablePayments), [sort, sortablePayments]);

  return (
    <Table id="payment_table" headers={<Headers {...{ sorting, applySorting }} />}>
      {sortedPayments.map(p => (
        <PaymentLine
          key={p.id}
          payment={p}
          setSortingFields={fields => setPaymentSortingFields(existing => ({ ...existing, [p.id]: fields }))}
        />
      ))}
    </Table>
  );
}
