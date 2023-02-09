import { Currency, getPaymentStatusOrder, PaymentStatus, Sortable } from "src/types";
import Line from "../Table/Line";
import Cell, { CellHeight } from "../Table/Cell";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import PayoutStatus from "../PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import GithubPRLink, { LinkColor } from "../PayoutTable/GithubPRLink";
import useGithubUser from "src/hooks/useGithubUser";
import { Field, SortingFields } from "src/hooks/usePaymentSorting";
import { useEffect } from "react";
import { PaymentRequestFragment } from "src/__generated/graphql";
import usePayoutSettings from "src/hooks/usePayoutSettings";

type Props = {
  payment: PaymentRequestFragment & Sortable;
  setSortingFields: (sortingFields: SortingFields) => void;
};

const ISSUE_NUMBER = /pull\/(\d+)$/;

export default function PaymentLine({ payment, setSortingFields }: Props) {
  const { valid: payoutSettingsValid } = usePayoutSettings(payment.recipientId);
  const { data: recipient } = useGithubUser(payment.recipientId);

  const paidAmount = payment.payments.reduce((total, payment) => total + payment.amount, 0);
  const paymentStatus = paidAmount === payment.amountInUsd ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT;
  const paymentReason = payment.reason?.work_items?.at(0);

  useEffect(() => {
    if (recipient?.login && usePayoutSettings != undefined) {
      const issueNumber = paymentReason?.match(ISSUE_NUMBER) || ["", ""];
      setSortingFields({
        [Field.Date]: new Date(payment.requestedAt),
        [Field.Contribution]: recipient.login.toLocaleLowerCase() + issueNumber[1].padStart(10, "0"),
        [Field.Amount]: payment.amountInUsd,
        [Field.Status]: getPaymentStatusOrder(payoutSettingsValid ? paymentStatus : "payout_missing"),
      });
    }
  }, [recipient?.login]);

  return (
    <>
      {payment && recipient && (
        <Line highlightOnHover={200}>
          <Cell height={CellHeight.Medium}>{displayRelativeDate(payment.requestedAt)}</Cell>
          <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
            <RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />
            <div className="flex flex-col truncate justify-center pb-0.5">
              <div className="font-medium text-sm text-greyscale-50 font-walsheim">{recipient.login}</div>
              {paymentReason && <GithubPRLink link={paymentReason} linkColor={LinkColor.Grey}></GithubPRLink>}
            </div>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <span className="font-walsheim">{formatMoneyAmount(payment.amountInUsd, Currency.USD)}</span>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <PayoutStatus
              {...{
                id: `payment-status-${payment.id}`,
                status: paymentStatus,
                payoutInfoMissing: !payoutSettingsValid,
              }}
              isProjectLeaderView
            />
          </Cell>
        </Line>
      )}
    </>
  );
}
