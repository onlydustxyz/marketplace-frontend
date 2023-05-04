import { getPaymentStatusOrder, PaymentStatus, Sortable } from "src/types";
import Line from "src/components/Table/Line";
import Cell, { CellHeight } from "src/components/Table/Cell";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import useGithubUser from "src/hooks/useGithubUser";
import { Field, SortingFields } from "src/hooks/usePaymentSorting";
import { useEffect } from "react";
import { PaymentRequestFragment } from "src/__generated/graphql";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { useIntl } from "src/hooks/useIntl";
import { pretty } from "src/utils/id";

type Props = {
  payment: PaymentRequestFragment & Sortable;
  setSortingFields: (sortingFields: SortingFields) => void;
  onClick: () => void;
  selected: boolean;
};

export default function PaymentLine({ payment, setSortingFields, onClick, selected }: Props) {
  const { valid: payoutSettingsValid } = usePayoutSettings(payment.recipientId);
  const { data: recipient } = useGithubUser(payment.recipientId);

  const paidAmount = payment.payments.reduce((total, payment) => total + payment.amount, 0);
  const paymentStatus = paidAmount === payment.amountInUsd ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT;

  const { T } = useIntl();

  useEffect(() => {
    if (recipient?.login && usePayoutSettings != undefined) {
      setSortingFields({
        [Field.Date]: new Date(payment.requestedAt),
        [Field.Contribution]: recipient.login.toLocaleLowerCase() + payment.id,
        [Field.Amount]: payment.amountInUsd,
        [Field.Status]: getPaymentStatusOrder(paymentStatus),
      });
    }
  }, [recipient?.login]);

  return (
    <>
      {payment && recipient && (
        <Line paymentId={payment.id} onClick={onClick} selected={selected}>
          <Cell height={CellHeight.Medium}>{displayRelativeDate(payment.requestedAt)}</Cell>
          <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
            <RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />
            <div className="flex flex-col truncate justify-center pb-0.5">
              <div className="font-medium text-sm text-greyscale-50 font-walsheim">{recipient.login}</div>
              <div className="text-spaceBlue-200">
                {T("payment.table.paymentRequest", {
                  id: pretty(payment.id),
                  count: payment.workItemsAggregate.aggregate?.count,
                })}
              </div>
            </div>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <span className="font-walsheim">{formatMoneyAmount({ amount: payment.amountInUsd })}</span>
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
