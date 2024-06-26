import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import Cell, { CellHeight } from "src/components/Table/Cell";
import Line from "src/components/Table/Line";
import { RewardPageItemType } from "src/hooks/useInfiniteRewardsList";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { pretty } from "src/utils/id";

import { PayoutStatus } from "components/features/payout-status/payout-status";

import { useIntl } from "hooks/translate/use-translate";

type Props = {
  reward: RewardPageItemType;
  onClick: () => void;
  selected: boolean;
  projectId: string;
};

export function RewardLine({ reward, onClick, selected, projectId }: Props) {
  const { T } = useIntl();

  const { id, amount, numberOfRewardedContributions, requestedAt, rewardedUser, status, unlockDate, processedAt } =
    reward || {};

  return (
    <>
      <Line rewardId={id} selected={selected} onClick={onClick}>
        <Cell height={CellHeight.Medium}>{displayRelativeDate(new Date(requestedAt))}</Cell>
        <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
          <RoundedImage src={rewardedUser.avatarUrl} alt={rewardedUser.login} rounding={Rounding.Circle} />
          <div className="flex flex-col justify-center truncate pb-0.5">
            <div className="font-walsheim text-sm font-medium text-greyscale-50">{rewardedUser.login}</div>
            <div className="text-spaceBlue-200">
              {T("reward.table.reward", {
                id: pretty(reward.id),
                count: numberOfRewardedContributions,
              })}
            </div>
          </div>
        </Cell>
        <Cell height={CellHeight.Medium}>
          <div className="rounded-full border border-white/8 bg-white/2 px-3 py-[6px]">
            <AvailableConversion
              tooltipId={`${reward.id}-reward-conversion`}
              currency={{
                currency: amount.currency,
                amount: amount.prettyAmount,
                dollar: amount.usdEquivalent,
              }}
            />
          </div>
        </Cell>
        <Cell height={CellHeight.Medium}>
          <PayoutStatus status={status} dates={{ unlockDate, processedAt }} projectId={projectId} />
        </Cell>
      </Line>
    </>
  );
}
