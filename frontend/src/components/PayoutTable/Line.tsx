import Line from "src/components/Table/Line";
import Cell from "src/components/Table/Cell";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import RoundedImage from "src/components/RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { Currency, getPaymentStatusOrder, PaymentStatus, PayoutSettings } from "src/types";
import { Field, SortingFields } from "src/hooks/usePaymentSorting";
import { useEffect } from "react";
import { WorkItemFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import { pretty } from "src/utils/id";

export type Payment = {
  id: string;
  requestedAt: Date;
  workItems: WorkItemFragment[];
  amount: {
    value: number;
    currency: Currency;
  };
  status: PaymentStatus;
  recipientId?: number;
  invoiceReceived: boolean;
  recipientPayoutSettings?: PayoutSettings;
  project?: {
    id: string;
    title: string;
    logoUrl?: string | null;
  } | null;
};

type Props = {
  payment: Payment;
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
  setSortingFields: (sortingFields: SortingFields) => void;
  onClick: () => void;
  selected: boolean;
};

export default function PaymentLine({
  payment,
  payoutInfoMissing,
  invoiceNeeded,
  setSortingFields,
  onClick,
  selected,
}: Props) {
  useEffect(() => {
    setSortingFields({
      [Field.Date]: payment.requestedAt,
      [Field.Contribution]: payment.project?.title?.toLocaleLowerCase() + payment.id,
      [Field.Amount]: payment.amount.value,
      [Field.Status]: getPaymentStatusOrder({
        status: payment.status,
        pendingPayoutInfo: payoutInfoMissing,
        pendingInvoice: invoiceNeeded && !payment.invoiceReceived,
      }),
    });
  }, [payment.status, payoutInfoMissing, invoiceNeeded, payment.invoiceReceived]);

  const { T } = useIntl();

  return (
    <Line onClick={onClick} selected={selected}>
      <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment?.project?.logoUrl || onlyDustLogo} alt={payment?.project?.title || ""} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-normal text-base font-belwe">{payment?.project?.title}</div>
          <div className="text-spaceBlue-200">
            {T("payment.table.paymentRequest", { id: pretty(payment.id), count: payment.workItems.length })}
          </div>
        </div>
      </Cell>
      <Cell>{formatMoneyAmount({ amount: payment.amount.value, currency: payment.amount.currency })}</Cell>
      <Cell>
        <PayoutStatus
          {...{
            id: `payout-status-${payment.id}`,
            status: payment.status,
            payoutInfoMissing,
            invoiceNeeded: invoiceNeeded && !payment.invoiceReceived,
          }}
        />
      </Cell>
    </Line>
  );
}
