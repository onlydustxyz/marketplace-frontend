import { MobileUserRewardItem } from "src/_pages/Rewards/UserRewardTable/MobileUserRewardList";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import { RewardPageItemType } from "src/hooks/useInfiniteRewardsList";
import { useIntl } from "src/hooks/useIntl";
import { PaymentStatus } from "src/types";
import { pretty } from "src/utils/id";

import { PayoutStatus } from "components/features/payout-status/payout-status";

export default function MobileRewardList({
  rewards,
  onRewardClick,
  projectId,
}: {
  rewards: RewardPageItemType[];
  onRewardClick: (reward: RewardPageItemType) => void;
  projectId: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {rewards.map(reward => (
        <button onClick={() => onRewardClick(reward)} key={reward.id}>
          <MobileRewardItemContainer reward={reward} projectId={projectId} />
        </button>
      ))}
    </div>
  );
}

function MobileRewardItemContainer({ reward, projectId }: { reward: RewardPageItemType; projectId: string }) {
  const { T } = useIntl();

  return (
    <MobileUserRewardItem
      id={reward.id}
      image={
        <RoundedImage src={reward.rewardedUser.avatarUrl} alt={reward.rewardedUser.login} rounding={Rounding.Circle} />
      }
      title={reward.rewardedUser.login}
      request={T("reward.table.reward", {
        id: pretty(reward.id),
        count: reward.numberOfRewardedContributions,
      })}
      amount={reward.amount}
      date={new Date(reward.requestedAt)}
      payoutStatus={
        <PayoutStatus
          status={PaymentStatus[reward.status]}
          dates={{ unlockDate: reward?.unlockDate, processedAt: reward?.processedAt }}
          projectId={projectId}
        />
      }
    />
  );
}
