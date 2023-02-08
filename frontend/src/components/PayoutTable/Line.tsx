import Line from "../Table/Line";
import Cell from "../Table/Cell";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import RoundedImage from "src/components/RoundedImage";
import PayoutStatus from "../PayoutStatus";
import GithubPRLink, { LinkColor } from "./GithubPRLink";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getPaymentStatusOrder, Payment } from "src/types";
import { Field, SortingFields } from "src/hooks/usePaymentSorting";
import { useEffect } from "react";

type Props = {
  payment: Payment;
  payoutInfoMissing: boolean;
  setSortingFields: (sortingFields: SortingFields) => void;
};

const ISSUE_NUMBER = /pull\/(\d+)$/;

export default function PaymentLine({ payment, payoutInfoMissing, setSortingFields }: Props) {
  useEffect(() => {
    const issueNumber = payment.reason?.match(ISSUE_NUMBER) || ["", ""];
    setSortingFields({
      [Field.Date]: payment.requestedAt,
      [Field.Contribution]: payment.project?.title?.toLocaleLowerCase() + issueNumber[1].padStart(10, "0"),
      [Field.Amount]: payment.amount.value,
      [Field.Status]: getPaymentStatusOrder(payoutInfoMissing ? "payout_missing" : payment.status),
    });
  }, []);

  return (
    <Line highlightOnHover={200}>
      <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment?.project?.logoUrl || onlyDustLogo} alt={payment?.project?.title || ""} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-normal text-base font-belwe">{payment?.project?.title}</div>
          {payment.reason && <GithubPRLink link={payment.reason} linkColor={LinkColor.Grey}></GithubPRLink>}
        </div>
      </Cell>
      <Cell>{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</Cell>
      <Cell>
        <PayoutStatus {...{ id: `payout-status-${payment.id}`, status: payment.status, payoutInfoMissing }} />
      </Cell>
    </Line>
  );
}
