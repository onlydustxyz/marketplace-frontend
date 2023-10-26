import Line from "src/components/Table/Line";
import Cell from "src/components/Table/Cell";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import RoundedImage from "src/components/RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { useIntl } from "src/hooks/useIntl";
import { pretty } from "src/utils/id";
import { components } from "src/__generated/api";

export type MyRewardType = components["schemas"]["MyRewardPageItemResponse"];

type Props = {
  reward: MyRewardType;
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
  // setSortingFields: (sortingFields: SortingFields) => void;
  onClick: () => void;
  selected: boolean;
};

export default function RewardLine({ reward, payoutInfoMissing, invoiceNeeded, onClick, selected }: Props) {
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
