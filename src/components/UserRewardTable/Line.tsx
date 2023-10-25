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
import { components } from "src/__generated/api";

export type MyRewardType = components["schemas"]["MyRewardPageItemResponse"];

// export type Reward = {
//   id: string;
//   requestedAt: Date;
//   workItems: WorkItemFragment[];
//   amount: {
//     value: number;
//     currency: Currency;
//   };
//   status: PaymentStatus;
//   recipientId: number;
//   invoiceReceived: boolean;
//   recipientPayoutSettings?: PayoutSettings;
//   project?: {
//     id: string;
//     title: string | null;
//     logoUrl?: string | null;
//   } | null;
// };

type Props = {
  reward: MyRewardType;
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
      [Field.RewardId]: reward.rewardedOnProjectName?.toLocaleLowerCase() + reward.id,
      [Field.Amount]: reward.amount.total,
      [Field.Status]: getPaymentStatusOrder({
        status: reward.status,
        pendingPayoutInfo: payoutInfoMissing,
        pendingInvoice: invoiceNeeded,
      }),
    });
  }, [reward.status, payoutInfoMissing, invoiceNeeded]);

  const { T } = useIntl();

  return (
    <Line onClick={onClick} selected={selected}>
      <Cell>{displayRelativeDate(new Date(reward.requestedAt))}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage
          src={reward?.rewardedOnProjectLogoUrl || onlyDustLogo}
          alt={reward?.rewardedOnProjectName || ""}
        />
        <div className="flex flex-col justify-center truncate">
          <div className="font-belwe text-base font-normal">{reward?.rewardedOnProjectName}</div>
          <div className="text-spaceBlue-200">
            {T("reward.table.reward", { id: pretty(reward.id), count: reward?.numberOfRewardedContributions })}
          </div>
        </div>
      </Cell>
      <Cell>{formatMoneyAmount({ amount: reward.amount.total, currency: reward?.amount?.currency })}</Cell>
      <Cell>
        <PayoutStatus
          {...{
            id: `payout-status-${reward.id}`,
            status: reward.status,
            payoutInfoMissing,
            invoiceNeeded,
          }}
        />
      </Cell>
    </Line>
  );
}
