import Line from "src/components/Table/Line";
import Cell from "src/components/Table/Cell";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import RoundedImage from "src/components/RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { Currency, getPaymentStatusOrder, PaymentStatus, PayoutSettings } from "src/types";
import { Field, SortingFields } from "src/hooks/useRewardSorting";
import { useEffect } from "react";
import { WorkItemFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import { pretty } from "src/utils/id";

export type Reward = {
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
    title: string | null;
    logoUrl?: string | null;
  } | null;
};

type Props = {
  reward: Reward;
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
  setSortingFields: (sortingFields: SortingFields) => void;
  onClick: () => void;
  selected: boolean;
};

export default function RewardLine({
  reward,
  payoutInfoMissing,
  invoiceNeeded,
  setSortingFields,
  onClick,
  selected,
}: Props) {
  useEffect(() => {
    setSortingFields({
      [Field.Date]: reward.requestedAt,
      [Field.RewardId]: reward.project?.title?.toLocaleLowerCase() + reward.id,
      [Field.Amount]: reward.amount.value,
      [Field.Status]: getPaymentStatusOrder({
        status: reward.status,
        pendingPayoutInfo: payoutInfoMissing,
        pendingInvoice: invoiceNeeded && !reward.invoiceReceived,
      }),
    });
  }, [reward.status, payoutInfoMissing, invoiceNeeded, reward.invoiceReceived]);

  const { T } = useIntl();

  return (
    <Line onClick={onClick} selected={selected}>
      <Cell>{displayRelativeDate(reward.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={reward?.project?.logoUrl || onlyDustLogo} alt={reward?.project?.title || ""} />
        <div className="flex flex-col justify-center truncate">
          <div className="font-belwe text-base font-normal">{reward?.project?.title}</div>
          <div className="text-spaceBlue-200">
            {T("reward.table.reward", { id: pretty(reward.id), count: reward.workItems.length })}
          </div>
        </div>
      </Cell>
      <Cell>{formatMoneyAmount({ amount: reward.amount.value, currency: reward.amount.currency })}</Cell>
      <Cell>
        <PayoutStatus
          {...{
            id: `payout-status-${reward.id}`,
            status: reward.status,
            payoutInfoMissing,
            invoiceNeeded: invoiceNeeded && !reward.invoiceReceived,
          }}
        />
      </Cell>
    </Line>
  );
}
