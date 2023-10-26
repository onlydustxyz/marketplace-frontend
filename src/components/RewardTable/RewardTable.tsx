import { useState } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Table from "src/components/Table";
import { viewportConfig } from "src/config";
import { RewardPageItemType } from "src/hooks/useInfiniteRewardsList";
import { useMediaQuery } from "usehooks-ts";
import Headers from "./Headers";
import { RewardLine } from "./Line";
import MobileRewardList from "./MobileRewardList";

type RewardTableProps = {
  rewards: RewardPageItemType[];
  options: {
    fetchNextPage: () => void;
    hasNextPage: boolean;
    sorting: {
      field: string | undefined;
      isAscending: boolean | undefined;
    };
    sortField: (field: string) => void;
  };
};

export default function RewardTable({ rewards, options }: RewardTableProps) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const [selectedReward, setSelectedReward] = useState<RewardPageItemType | null>(null);

  const { fetchNextPage, hasNextPage, sorting, sortField } = options;

  const onRewardClick = (reward: RewardPageItemType) => {
    setSelectedReward(reward);
    //TODO: uncomment when setSidePanelOpen API is ready
    // setSidePanelOpen(true);
  };

  return (
    <>
      {isXl ? (
        <Table id="reward_table" headers={<Headers sorting={sorting} sortField={sortField} />}>
          {rewards.map(p => (
            <RewardLine key={p.id} reward={p} onClick={() => onRewardClick(p)} selected={p.id === selectedReward?.id} />
          ))}
        </Table>
      ) : (
        <MobileRewardList rewards={rewards} onRewardClick={onRewardClick} />
      )}
      {hasNextPage ? (
        <div className="flex items-center justify-center py-4">
          <Button type={ButtonType.Secondary} size={ButtonSize.Sm} onClick={fetchNextPage}>
            See more
          </Button>
        </div>
      ) : null}

      {
        // TODO: when side pannel API is ready, uncomment this
        /* <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && (
          <RewardSidePanelAsLeader
            projectId={projectId}
            rewardId={selectedReward.id}
            setOpen={setSidePanelOpen}
            recipientId={selectedReward.id}
          />
        )}
      </SidePanel> */
      }
    </>
  );
}
