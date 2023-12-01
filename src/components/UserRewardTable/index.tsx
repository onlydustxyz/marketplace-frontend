import { useState } from "react";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { MyRewardType } from "./Line";
import DesktopUserRewardList from "./DesktopUserRewardList";
import MobileUserRewardList from "./MobileUserRewardList";
import { useStackMyReward } from "src/App/Stacks";

const UserRewardTable: React.FC = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [selectedReward, setSelectedReward] = useState<MyRewardType | null>(null);

  const [openRewardPanel] = useStackMyReward();

  const onRewardClick = (reward: MyRewardType) => {
    setSelectedReward(reward);
    if (reward.id) {
      openRewardPanel({ rewardId: reward.id, projectId: reward.projectId });
    }
  };

  return (
    <>
      {isXl ? (
        <DesktopUserRewardList onRewardClick={onRewardClick} selectedReward={selectedReward} />
      ) : (
        <MobileUserRewardList onRewardClick={onRewardClick} />
      )}
    </>
  );
};

export default UserRewardTable;
