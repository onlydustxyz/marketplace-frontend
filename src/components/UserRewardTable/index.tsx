import { ComponentProps, useState } from "react";
import SidePanel from "src/components/SidePanel";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import { viewportConfig } from "src/config";
import useInfiniteMyRewardList from "src/hooks/useInfiniteMyRewardList/useInfiniteMyRewardList";
import { useMediaQuery } from "usehooks-ts";
import Headers from "./Headers";
import RewardLine, { MyRewardType } from "./Line";
import MobileUserRewardList from "./MobileUserRewardList";
import RewardSidePanel from "./RewardSidePanel";

type PropsType = {
  rewards: MyRewardType[];
} & ComponentProps<typeof Headers> &
  Pick<ReturnType<typeof useInfiniteMyRewardList>, "fetchNextPage" | "hasNextPage" | "isFetchingNextPage">;

const UserRewardTable: React.FC<PropsType> = ({
  rewards,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  sorting,
  sortField,
}) => {
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
        <div>
          <Table id="reward_table" headers={<Headers sorting={sorting} sortField={sortField} />}>
            {rewards.map(p => (
              <RewardLine
                key={p?.id}
                reward={p}
                onClick={() => onRewardClick(p)}
                selected={p?.id === selectedReward?.id}
              />
            ))}
          </Table>
          {hasNextPage && (
            <div className="pt-6">
              <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          )}
        </div>
      ) : (
        <MobileUserRewardList
          rewards={rewards}
          onRewardClick={onRewardClick}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
      <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && <RewardSidePanel rewardId={selectedReward.id} isMine />}
      </SidePanel>
    </>
  );
};

export default UserRewardTable;
