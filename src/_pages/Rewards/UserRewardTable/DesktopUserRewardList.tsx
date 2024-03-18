import { ReactElement, useContext } from "react";

import ErrorFallback from "src/ErrorFallback";
import { UserRewardsContext } from "src/_pages/Rewards/context/UserRewards";
import Card from "src/components/Card";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";

import Skeleton from "../../../components/Skeleton";
import Headers from "./Headers";
import RewardLine, { MyRewardType } from "./Line";

type PropsType = {
  onRewardClick: (reward: MyRewardType) => void;
  selectedReward: MyRewardType | null;
  emptyState?: ReactElement;
};

export default function DesktopUserRewardList({ onRewardClick, selectedReward, emptyState }: PropsType) {
  const { query, dateSorting } = useContext(UserRewardsContext);

  const { sorting, sortField } = dateSorting;

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = query ?? {};

  if (error) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
        <ErrorFallback />
      </div>
    );
  }

  const rewards = data?.pages.flatMap(({ rewards }) => rewards) ?? [];

  if (isLoading) {
    return <Skeleton variant="rewards" />;
  }

  return (
    <Card>
      <div>
        <Table
          id="reward_table"
          headers={<Headers sorting={sorting} sortField={sortField} />}
          emptyFallback={rewards.length === 0 ? emptyState : undefined}
        >
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
    </Card>
  );
}
