import { Sortable } from "src/types";
import Table from "src/components/Table";
import useRewardSorting, { SortingFields } from "src/hooks/useRewardSorting";
import RewardLine, { Reward } from "./Line";
import Headers from "./Headers";
import { useCallback, useMemo, useState } from "react";
import RewardSidePanel from "./RewardSidePanel";
import { viewportConfig } from "src/config";
import MobileUserRewardList from "./MobileUserRewardList";
import { useMediaQuery } from "usehooks-ts";
import SidePanel from "src/components/SidePanel";

type PropsType = {
  rewards: (Reward & Sortable)[];
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
};

const UserRewardTable: React.FC<PropsType> = ({ rewards, payoutInfoMissing, invoiceNeeded }) => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [rewardSortingFields, setRewardSortingFields] = useState<Record<string, SortingFields>>({});
  const { sort, sorting, applySorting } = useRewardSorting();

  const sortableRewards = useMemo(
    () => rewards.map(p => ({ ...p, sortingFields: rewardSortingFields[p.id] })),
    [rewardSortingFields, rewards]
  );

  const sortedRewards = useMemo(() => sort(sortableRewards), [sort, sortableRewards]);

  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const setSortingFields = useCallback(
    (p: Reward) => (fields: SortingFields) => setRewardSortingFields(existing => ({ ...existing, [p.id]: fields })),
    []
  );

  const onRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
    setSidePanelOpen(true);
  };

  return (
    <>
      {isXl ? (
        <Table id="reward_table" headers={<Headers sorting={sorting} applySorting={applySorting} />}>
          {sortedRewards.map(p => (
            <RewardLine
              key={p.id}
              reward={p}
              payoutInfoMissing={payoutInfoMissing}
              invoiceNeeded={invoiceNeeded}
              setSortingFields={setSortingFields(p)}
              onClick={() => onRewardClick(p)}
              selected={p.id === selectedReward?.id}
            />
          ))}
        </Table>
      ) : (
        <MobileUserRewardList
          rewards={sortedRewards}
          payoutInfoMissing={payoutInfoMissing}
          invoiceNeeded={invoiceNeeded}
          onRewardClick={onRewardClick}
        />
      )}
      <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && <RewardSidePanel rewardId={selectedReward.id} recipientId={selectedReward.recipientId} />}
      </SidePanel>
    </>
  );
};

export default UserRewardTable;
