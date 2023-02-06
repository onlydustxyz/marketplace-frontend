import { PaymentWithRecipientInfo } from "src/types";
import Table from "../Table";
import usePaymentSorting from "src/hooks/usePaymentSorting";
import Headers from "./Headers";
import PaymentLine from "./Line";

type Props = {
  payments: PaymentWithRecipientInfo[];
};

export default function PaymentTable({ payments }: Props) {
  const { sortedPayments, sorting, applySorting } = usePaymentSorting(payments);

  return (
    <Table id="payment_table" headers={<Headers {...{ sorting, applySorting }} />}>
      {sortedPayments.map(p => (
        <PaymentLine payment={p} />
      ))}
    </Table>
  );
}
