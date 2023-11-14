import Table from "src/components/Table";
import Headers, { Fields } from "./Headers";
import RewardLine, { MyRewardType } from "./Line";
import useQueryParamsSorting from "../RewardTable/useQueryParamsSorting";
import MeApi from "src/api/me";
import { ShowMore } from "../Table/ShowMore";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import Card from "src/components/Card";
import Skeleton from "../Skeleton";

type PropsType = {
  onRewardClick: (reward: MyRewardType) => void;
  selectedReward: MyRewardType | null;
};

export default function DesktopUserRewardList({ onRewardClick, selectedReward }: PropsType) {
  const { sorting, sortField, queryParams } = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "myRewardsSorting",
  });

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    MeApi.queries.useMyRewardsInfiniteList({
      queryParams,
    });

  if (error) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
        <ErrorFallback />
      </div>
    );
  }

  const rewards = data?.pages.flatMap(({ rewards }) => rewards) ?? [];

  const hasRewards = rewards && rewards.length > 0;
  if (!hasRewards && !isLoading && !isFetchingNextPage) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  if (isLoading) {
    return <Skeleton variant="rewards" />;
  }

  return (
    <Card>
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
    </Card>
  );
}
