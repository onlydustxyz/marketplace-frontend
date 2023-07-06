import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PaymentStatus } from "src/types";
import { pretty } from "src/utils/id";
import { formatMoneyAmount } from "src/utils/money";
import PayoutStatus from "src/components/PayoutStatus";
import { MobilePaymentItem } from "src/components/PayoutTable/MobilePayoutList";
import RoundedImage, { Rounding } from "src/components/RoundedImage";

export default function MobilePaymentList({
  payments,
  onPaymentClick,
}: {
  payments: ExtendedPaymentRequestFragment[];
  onPaymentClick: (payment: ExtendedPaymentRequestFragment) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {payments.map(payment => (
        <button onClick={() => onPaymentClick(payment)} key={payment.id}>
          <MobilePaymentItemContainer payment={payment} />
        </button>
      ))}
    </div>
  );
}

function MobilePaymentItemContainer({ payment }: { payment: ExtendedPaymentRequestFragment }) {
  const { T } = useIntl();

  const { valid: payoutSettingsValid } = usePayoutSettings(payment.recipientId);

  const recipient = payment.githubRecipient;
  const paidAmount = payment.paymentsAggregate.aggregate?.sum?.amount;
  const paymentStatus = paidAmount === payment.amountInUsd ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT;

  return (
    payment &&
    recipient && (
      <MobilePaymentItem
        image={<RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />}
        title={recipient.login}
        request={T("payment.table.paymentRequest", {
          id: pretty(payment.id),
          count: payment.workItemsAggregate.aggregate?.count,
        })}
        amount={formatMoneyAmount({ amount: payment.amountInUsd })}
        date={payment.requestedAt}
        payoutStatus={
          <PayoutStatus
            {...{
              id: `payment-status-${payment.id}`,
              status: paymentStatus,
              payoutInfoMissing: !payoutSettingsValid,
            }}
            isProjectLeaderView
          />
        }
      />
    )
  );
}
