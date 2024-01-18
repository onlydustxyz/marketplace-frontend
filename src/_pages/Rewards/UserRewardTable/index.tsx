import React, { ReactElement, useState } from "react";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { MyRewardType } from "./Line";
import DesktopUserRewardList from "./DesktopUserRewardList";
import MobileUserRewardList from "./MobileUserRewardList";
import { useStackReward } from "src/App/Stacks/Stacks";

export function UserRewardTable({ emptyState }: { emptyState?: ReactElement }) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [selectedReward, setSelectedReward] = useState<MyRewardType | null>(null);

  const [openRewardPanel] = useStackReward();

  const onRewardClick = (reward: MyRewardType) => {
    setSelectedReward(reward);
    if (reward.id) {
      openRewardPanel({ rewardId: reward.id, projectId: reward.projectId, isMine: true });
    }
  };

  return (
    <>
      {isXl ? (
        <DesktopUserRewardList onRewardClick={onRewardClick} selectedReward={selectedReward} emptyState={emptyState} />
      ) : (
        <MobileUserRewardList onRewardClick={onRewardClick} />
      )}
    </>
  );
}
