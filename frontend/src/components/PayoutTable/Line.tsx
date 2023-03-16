import Line from "src/components/Table/Line";
import Cell from "src/components/Table/Cell";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import RoundedImage from "src/components/RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import GithubPRLink from "./GithubPRLink";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { Currency, getPaymentStatusOrder, PaymentStatus, PayoutSettings } from "src/types";
import { Field, SortingFields } from "src/hooks/usePaymentSorting";
import { useEffect } from "react";

export type Payment = {
  id: string;
  requestedAt: Date;
  reason: string;
  amount: {
    value: number;
    currency: Currency;
  };
  status: PaymentStatus;
  recipientId?: number;
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
};

const ISSUE_NUMBER = /pull\/(\d+)$/;

export default function PaymentLine({ payment, payoutInfoMissing, invoiceNeeded, setSortingFields }: Props) {
  useEffect(() => {
    const issueNumber = payment.reason?.match(ISSUE_NUMBER) || ["", ""];
    setSortingFields({
      [Field.Date]: payment.requestedAt,
      [Field.Contribution]: payment.project?.title?.toLocaleLowerCase() + issueNumber[1].padStart(10, "0"),
      [Field.Amount]: payment.amount.value,
      [Field.Status]: getPaymentStatusOrder(payment.status),
    });
  }, []);

  return (
    <Line highlightOnHover={200}>
      <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment?.project?.logoUrl || onlyDustLogo} alt={payment?.project?.title || ""} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-normal text-base font-belwe">{payment?.project?.title}</div>
          {payment.reason && <GithubPRLink link={payment.reason}></GithubPRLink>}
        </div>
      </Cell>
      <Cell>{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</Cell>
      <Cell>
        <PayoutStatus
          {...{ id: `payout-status-${payment.id}`, status: payment.status, payoutInfoMissing, invoiceNeeded }}
        />
      </Cell>
    </Line>
  );
}
