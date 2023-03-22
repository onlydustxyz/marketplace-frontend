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
import { WorkItemFragment } from "src/__generated/graphql";

export type Payment = {
  id: string;
  requestedAt: Date;
  reason?: WorkItemFragment;
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
};

export default function PaymentLine({ payment, payoutInfoMissing, invoiceNeeded, setSortingFields }: Props) {
  useEffect(() => {
    setSortingFields({
      [Field.Date]: payment.requestedAt,
      [Field.Contribution]:
        payment.project?.title?.toLocaleLowerCase() + payment.reason?.issueNumber.toString().padStart(10, "0"),
      [Field.Amount]: payment.amount.value,
      [Field.Status]: getPaymentStatusOrder(payment.status),
    });
  }, []);

  const githubLink = `https://github.com/${payment.reason?.repoOwner}/${payment.reason?.repoName}/pull/${payment.reason?.issueNumber}`;

  return (
    <Line highlightOnHover={200}>
      <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment?.project?.logoUrl || onlyDustLogo} alt={payment?.project?.title || ""} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-normal text-base font-belwe">{payment?.project?.title}</div>
          {payment.reason && <GithubPRLink link={githubLink}></GithubPRLink>}
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
