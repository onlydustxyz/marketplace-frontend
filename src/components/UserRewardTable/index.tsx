import { Sortable } from "src/types";
import Table from "src/components/Table";
import useRewardSorting, { SortingFields } from "src/hooks/useRewardSorting";
import RewardLine, { MyRewardType } from "./Line";
import Headers from "./Headers";
import { useCallback, useMemo, useState } from "react";
import RewardSidePanel from "./RewardSidePanel";
import { viewportConfig } from "src/config";
import MobileUserRewardList from "./MobileUserRewardList";
import { useMediaQuery } from "usehooks-ts";
import SidePanel from "src/components/SidePanel";
import { Field, Sorting } from "src/pages/Rewards";
import { ShowMore } from "src/components/Table/ShowMore";

type PropsType = {
  rewards: MyRewardType[];
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
};

const UserRewardTable: React.FC<PropsType> = ({
  rewards,
  payoutInfoMissing,
  invoiceNeeded,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  sorting,
  applySorting,
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
          <Table id="reward_table" headers={<Headers sorting={sorting} applySorting={applySorting} />}>
            {rewards.map(p => (
              <RewardLine
                key={p.id}
                reward={p}
                payoutInfoMissing={payoutInfoMissing}
                invoiceNeeded={invoiceNeeded}
                onClick={() => onRewardClick(p)}
                selected={p.id === selectedReward?.id}
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
          payoutInfoMissing={payoutInfoMissing}
          invoiceNeeded={invoiceNeeded}
          onRewardClick={onRewardClick}
        />
      )}
      <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && <RewardSidePanel rewardId={selectedReward.id} recipientId={selectedReward.id} />}
      </SidePanel>
    </>
  );
};

export default UserRewardTable;
