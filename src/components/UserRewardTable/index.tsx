import { useState } from "react";
import SidePanel from "src/components/SidePanel";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { MyRewardType } from "./Line";
import RewardSidePanel from "./RewardSidePanel";
import DesktopUserRewardList from "./DesktopUserRewardList";
import MobileUserRewardList from "./MobileUserRewardList";

const UserRewardTable: React.FC = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [selectedReward, setSelectedReward] = useState<MyRewardType | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const onRewardClick = (reward: MyRewardType) => {
    setSelectedReward(reward);
    setSidePanelOpen(true);
  };

  return (
    <>
      {isXl ? (
        <DesktopUserRewardList onRewardClick={onRewardClick} selectedReward={selectedReward} />
      ) : (
        <MobileUserRewardList onRewardClick={onRewardClick} />
      )}
      <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && <RewardSidePanel rewardId={selectedReward.id} isMine />}
      </SidePanel>
    </>
  );
};

export default UserRewardTable;
