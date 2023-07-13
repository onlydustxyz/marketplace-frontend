import { getPaymentStatusOrder, PaymentStatus, Sortable } from "src/types";
import Line from "src/components/Table/Line";
import Cell, { CellHeight } from "src/components/Table/Cell";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { Field, SortingFields } from "src/hooks/useRewardSorting";
import { useEffect } from "react";
import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { useIntl } from "src/hooks/useIntl";
import { pretty } from "src/utils/id";

type Props = {
  reward: ExtendedPaymentRequestFragment & Sortable;
  setSortingFields: (sortingFields: SortingFields) => void;
  onClick: () => void;
  selected: boolean;
};

export default function RewardLine({ reward, setSortingFields, onClick, selected }: Props) {
  const { valid: payoutSettingsValid } = usePayoutSettings(reward.recipientId);

  const recipient = reward.githubRecipient;
  const paidAmount = reward.paymentsAggregate.aggregate?.sum?.amount;
  const paymentStatus = paidAmount === reward.amountInUsd ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT;

  const { T } = useIntl();

  useEffect(() => {
    if (recipient?.login && usePayoutSettings != undefined) {
      setSortingFields({
        [Field.Date]: new Date(reward.requestedAt),
        [Field.RewardId]: recipient.login.toLocaleLowerCase() + reward.id,
        [Field.Amount]: reward.amountInUsd,
        [Field.Status]: getPaymentStatusOrder({
          status: paymentStatus,
          pendingPayoutInfo: !payoutSettingsValid,
        }),
      });
    }
  }, [recipient?.login, paymentStatus, payoutSettingsValid]);

  return (
    <>
      {reward && recipient && (
        <Line rewardId={reward.id} onClick={onClick} selected={selected}>
          <Cell height={CellHeight.Medium}>{displayRelativeDate(reward.requestedAt)}</Cell>
          <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
            <RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />
            <div className="flex flex-col justify-center truncate pb-0.5">
              <div className="font-walsheim text-sm font-medium text-greyscale-50">{recipient.login}</div>
              <div className="text-spaceBlue-200">
                {T("reward.table.reward", {
                  id: pretty(reward.id),
                  count: reward.workItemsAggregate.aggregate?.count,
                })}
              </div>
            </div>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <span className="font-walsheim">{formatMoneyAmount({ amount: reward.amountInUsd })}</span>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <PayoutStatus
              {...{
                id: `payment-status-${reward.id}`,
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
