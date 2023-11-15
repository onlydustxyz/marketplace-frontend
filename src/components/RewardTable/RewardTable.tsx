import { useApolloClient } from "@apollo/client";
import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import SidePanel from "src/components/SidePanel";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import { RewardSidePanelAsLeader } from "src/components/UserRewardTable/RewardSidePanel";
import { viewportConfig } from "src/config";
import useInfiniteRewardsList, { RewardPageItemType } from "src/hooks/useInfiniteRewardsList";
import { useMediaQuery } from "usehooks-ts";
import Headers from "./Headers";
import { RewardLine } from "./Line";
import MobileRewardList from "./MobileRewardList";
import MeApi from "src/api/me";

type Options = ComponentProps<typeof Headers> &
  Pick<
    ReturnType<typeof useInfiniteRewardsList>,
    "fetchNextPage" | "hasNextPage" | "isFetchingNextPage" | "refetch"
  > & { refetchBudgets: () => void };

type RewardTableProps = {
  rewards: RewardPageItemType[];
  options: Options;
  projectId: string;
};

export default function RewardTable({ rewards, options, projectId }: RewardTableProps) {
  const queryClient = useQueryClient();
  const client = useApolloClient();

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const [selectedReward, setSelectedReward] = useState<RewardPageItemType | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const { fetchNextPage, hasNextPage, sorting, sortField, isFetchingNextPage, refetch, refetchBudgets } = options;

  const onRewardClick = (reward: RewardPageItemType) => {
    setSelectedReward(reward);
    setSidePanelOpen(true);
  };

  function handleCancelReward() {
    try {
      // refetch PaymentRequests to hide MyRewards
      client.refetchQueries({ include: ["GetPaymentRequestIds"] });
      queryClient.invalidateQueries({ queryKey: MeApi.tags.all });
      setSidePanelOpen(false);
      refetch();
      refetchBudgets();
    } catch (e) {
      console.error(e);
    }
  }

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
      {hasNextPage && (
        <div className="pt-6">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      )}

      <SidePanel open={sidePanelOpen} setOpen={setSidePanelOpen}>
        {selectedReward && (
          <RewardSidePanelAsLeader
            projectId={projectId}
            rewardId={selectedReward.id}
            onRewardCancel={handleCancelReward}
          />
        )}
      </SidePanel>
    </>
  );
}
