import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useStackProjecRewardAsLead } from "src/App/Stacks/Stacks";
import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import { viewportConfig } from "src/config";
import useInfiniteRewardsList, { RewardPageItemType } from "src/hooks/useInfiniteRewardsList";

import Headers from "./Headers";
import { RewardLine } from "./Line";
import MobileRewardList from "./MobileRewardList";

type Options = ComponentProps<typeof Headers> &
  Pick<ReturnType<typeof useInfiniteRewardsList>, "fetchNextPage" | "hasNextPage" | "isFetchingNextPage" | "refetch">;

type RewardTableProps = {
  rewards: RewardPageItemType[];
  options: Options;
  projectId: string;
  emptyFallback?: React.ReactNode;
};

export default function RewardTable({ rewards, options, projectId, emptyFallback }: RewardTableProps) {
  const queryClient = useQueryClient();

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const [selectedReward, setSelectedReward] = useState<RewardPageItemType | null>(null);

  const [openRewardPanel, closeRewardPanel] = useStackProjecRewardAsLead();

  const { fetchNextPage, hasNextPage, sorting, sortField, isFetchingNextPage, refetch } = options;
  function handleCancelReward() {
    try {
      // TODO refactor mutateReward in RewardSidePanelAsLeader and add invalidate query directly inside the mutation query
      queryClient.invalidateQueries({
        queryKey: [MeApi.tags.all, ProjectApi.tags.budgets(projectId ?? "")],
      });
      closeRewardPanel();
      refetch();
    } catch (e) {
      console.error(e);
    }
  }

  const onRewardClick = (reward: RewardPageItemType) => {
    setSelectedReward(reward);
    if (reward.id) {
      openRewardPanel({
        rewardId: reward.id,
        projectId,
        onRewardCancel: handleCancelReward,
      });
    }
  };

  return (
    <>
      {isXl ? (
        <Table
          id="reward_table"
          headers={<Headers sorting={sorting} sortField={sortField} />}
          emptyFallback={emptyFallback}
        >
          {rewards.map(p => (
            <RewardLine
              key={p.id}
              reward={p}
              onClick={() => onRewardClick(p)}
              selected={p.id === selectedReward?.id}
              projectId={projectId}
            />
          ))}
        </Table>
      ) : (
        <>
          {emptyFallback ? (
            emptyFallback
          ) : (
            <MobileRewardList rewards={rewards} onRewardClick={onRewardClick} projectId={projectId} />
          )}
        </>
      )}
      {hasNextPage && (
        <div className="pt-6">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      )}
    </>
  );
}
