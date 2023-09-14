import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PaymentStatus } from "src/types";
import { pretty } from "src/utils/id";
import { formatMoneyAmount } from "src/utils/money";
import PayoutStatus from "src/components/PayoutStatus";
import { MobileUserRewardItem } from "src/components/UserRewardTable/MobileUserRewardList";
import RoundedImage, { Rounding } from "src/components/RoundedImage";

export default function MobileRewardList({
  rewards,
  onRewardClick,
}: {
  rewards: ExtendedPaymentRequestFragment[];
  onRewardClick: (reward: ExtendedPaymentRequestFragment) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {rewards.map(reward => (
        <button onClick={() => onRewardClick(reward)} key={reward.id}>
          <MobileRewardItemContainer reward={reward} />
        </button>
      ))}
    </div>
  );
}

function MobileRewardItemContainer({ reward }: { reward: ExtendedPaymentRequestFragment }) {
  const { T } = useIntl();

  const { valid: payoutSettingsValid } = usePayoutSettings(reward.recipientId);

  const recipient = reward.githubRecipient;
  const paidAmount = reward.paymentsAggregate.aggregate?.sum?.amount;
  const paymentStatus = paidAmount === reward.amount ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT;

  return (
    reward &&
    recipient && (
      <MobileUserRewardItem
        image={<RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />}
        title={recipient.login}
        request={T("reward.table.reward", {
          id: pretty(reward.id),
          count: reward.workItemsAggregate.aggregate?.count,
        })}
        amount={formatMoneyAmount({ amount: reward.amount })}
        date={reward.requestedAt}
        payoutStatus={
          <PayoutStatus
            {...{
              id: `payment-status-${reward.id}`,
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
