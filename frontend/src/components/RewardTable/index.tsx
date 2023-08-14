import { Sortable } from "src/types";
import Table from "src/components/Table";
import useRewardSorting, { SortingFields } from "src/hooks/useRewardSorting";
import Headers from "./Headers";
import RewardLine from "./Line";
import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import { useMemo, useState } from "react";
import { RewardSidePanelAsLeader as RewardSidePanelAsLeader } from "src/components/UserRewardTable/RewardSidePanel";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import MobileRewardList from "./MobileRewardList";
import SidePanel from "src/components/SidePanel";

type Props = {
  projectId: string;
  rewards: (ExtendedPaymentRequestFragment & Sortable)[];
};

export default function RewardTable({ projectId, rewards }: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [sortingFields, setSortingFields] = useState<Record<string, SortingFields>>({});
  const { sort, sorting, applySorting } = useRewardSorting();

  const sortableRewards = useMemo(
    () => rewards.map(p => ({ ...p, sortingFields: sortingFields[p.id] })),
    [sortingFields, rewards]
  );

  const sortedRewards = useMemo(() => sort(sortableRewards), [sort, sortableRewards]);

  const [selectedReward, setSelectedReward] = useState<ExtendedPaymentRequestFragment | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const onRewardClick = (reward: ExtendedPaymentRequestFragment) => {
    setSelectedReward(reward);
    setSidePanelOpen(true);
  };

  return (
    <>
      {isXl ? (
        <Table id="reward_table" headers={<Headers {...{ sorting, applySorting }} />}>
          {sortedRewards.map(p => (
            <RewardLine
              key={p.id}
              reward={p}
              setSortingFields={fields => setSortingFields(existing => ({ ...existing, [p.id]: fields }))}
              onClick={() => onRewardClick(p)}
              selected={p.id === selectedReward?.id}
            />
          ))}
        </Table>
      ) : (
        <MobileRewardList rewards={sortedRewards} onRewardClick={onRewardClick} />
      )}
      <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && (
          <RewardSidePanelAsLeader projectId={projectId} rewardId={selectedReward.id} setOpen={setSidePanelOpen} />
        )}
      </SidePanel>
    </>
  );
}
