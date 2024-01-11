import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useStackReward } from "src/App/Stacks/Stacks";
import { viewportConfig } from "src/config";

import DesktopUserRewardList from "./DesktopUserRewardList";
import { MyRewardType } from "./Line";
import MobileUserRewardList from "./MobileUserRewardList";

const UserRewardTable: React.FC<{ emptyState?: React.ReactElement }> = ({ emptyState }) => {
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
};

export default UserRewardTable;
