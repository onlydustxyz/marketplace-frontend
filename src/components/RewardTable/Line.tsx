import PayoutStatus from "src/components/PayoutStatus/PayoutStatus";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import Cell, { CellHeight } from "src/components/Table/Cell";
import Line from "src/components/Table/Line";
import { RewardPageItemType } from "src/hooks/useInfiniteRewardsList";
import { useIntl } from "src/hooks/useIntl";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { pretty } from "src/utils/id";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";

type Props = {
  reward: RewardPageItemType;
  onClick: () => void;
  selected: boolean;
};

export function RewardLine({ reward, onClick, selected }: Props) {
  const { T } = useIntl();

  const { id, amount, numberOfRewardedContributions, requestedAt, rewardedUserAvatar, rewardedUserLogin, status } =
    reward || {};

  return (
    <>
      <Line rewardId={id} selected={selected} onClick={onClick}>
        <Cell height={CellHeight.Medium}>{displayRelativeDate(new Date(requestedAt))}</Cell>
        <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
          <RoundedImage src={rewardedUserAvatar} alt={rewardedUserLogin} rounding={Rounding.Circle} />
          <div className="flex flex-col justify-center truncate pb-0.5">
            <div className="font-walsheim text-sm font-medium text-greyscale-50">{rewardedUserLogin}</div>
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
                amount: amount.total,
                dollar: amount.dollarsEquivalent,
              }}
            />
          </div>
        </Cell>
        <Cell height={CellHeight.Medium}>
          <PayoutStatus status={status} />
        </Cell>
      </Line>
    </>
  );
}
