import { useMemo } from "react";

import { components } from "src/__generated/api";
import { IMAGES } from "src/assets/img";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import RoundedImage from "src/components/RoundedImage";
import Cell from "src/components/Table/Cell";
import Line from "src/components/Table/Line";
import { useIntl } from "src/hooks/useIntl";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { pretty } from "src/utils/id";

import { Avatar } from "components/ds/avatar/avatar";
import { PayoutStatus } from "components/features/payout-status/payout-status";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export type MyRewardType = components["schemas"]["MyRewardPageItemResponse"];

type Props = {
  reward: MyRewardType;
  onClick: () => void;
  selected: boolean;
  showContributor?: boolean;
};

export default function RewardLine({ reward, onClick, selected, showContributor }: Props) {
  const { T } = useIntl();
  const { user } = useCurrentUser();

  const isCurrentUser = useMemo(() => user?.githubUserId === reward?.rewardedUser.githubUserId, [user, reward]);

  return (
    <Line onClick={onClick} selected={selected}>
      <Cell>
        <span className="first-letter:uppercase">{displayRelativeDate(new Date(reward?.requestedAt))}</span>
      </Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage
          src={reward?.rewardedOnProjectLogoUrl || IMAGES.logo.space}
          alt={reward?.rewardedOnProjectName || ""}
        />
        <div className="flex flex-col justify-center truncate">
          <div className="truncate font-belwe text-base font-normal">{reward?.rewardedOnProjectName}</div>
          <div className="text-spaceBlue-200">
            {T("reward.table.reward", { id: pretty(reward?.id), count: reward?.numberOfRewardedContributions })}
          </div>
        </div>
      </Cell>
      <Cell>
        {reward?.amount.total ? (
          <div className="rounded-full border border-white/8 bg-white/2 px-3 py-[6px]">
            <AvailableConversion
              tooltipId={`${reward?.id}-contributors-earned-details`}
              totalAmount={reward?.amount?.total}
              currency={{
                currency: reward?.amount?.currency,
                amount: reward?.amount?.total,
                dollar: reward?.amount?.dollarsEquivalent,
              }}
            />
          </div>
        ) : (
          "-"
        )}
      </Cell>
      {showContributor ? (
        <Cell>
          <Avatar.Labelled avatarProps={{ src: reward.rewardedUser.avatarUrl }}>
            {reward.rewardedUser.login} {isCurrentUser ? `(${T("reward.table.you")})` : ""}
          </Avatar.Labelled>
        </Cell>
      ) : null}
      <Cell>
        <PayoutStatus
          status={reward?.status}
          dates={{ unlockDate: reward?.unlockDate, processedAt: reward?.processedAt }}
          projectId={reward?.projectId}
        />
      </Cell>
    </Line>
  );
}
