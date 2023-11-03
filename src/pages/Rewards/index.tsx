import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Card from "src/components/Card";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import SEO from "src/components/SEO";
import Skeleton from "src/components/Skeleton";
import UserRewardTable from "src/components/UserRewardTable";
import { Fields } from "src/components/UserRewardTable/Headers";
import useInfiniteMyRewardList from "src/hooks/useInfiniteMyRewardList/useInfiniteMyRewardList";
import { useT } from "talkr";
import { EarningWrapper } from "./Earning/EarningWrapper";
import InvoiceSubmission from "./InvoiceSubmission";

export enum RewardStatus {
  COMPLETE = "COMPLETE",
  PENDING_INVOICE = "PENDING_INVOICE",
  PENDING_SIGNUP = "PENDING_SIGNUP",
  PROCESSING = "PROCESSING",
}

export default function Rewards() {
  const { T } = useT();

  const { sorting, sortField, queryParams } = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "myRewardsSorting",
  });

  const { data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteMyRewardList({
    queryParams,
  });

  if (error) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
        <ErrorFallback />
      </div>
    );
  }

  const rewards = data?.pages.flatMap(page => page.rewards) || [];

  const hasRewards = rewards && rewards.length > 0;
  if (!hasRewards && !isFetching && !isFetchingNextPage) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
          <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
          <InvoiceSubmission refetchMyRewards={refetch} />
          <EarningWrapper />
          {isFetching ? (
            <Skeleton variant="rewards" />
          ) : (
            <Card>
              {rewards && (
                <UserRewardTable
                  rewards={rewards}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  sorting={sorting}
                  sortField={sortField}
                />
              )}
            </Card>
          )}
        </div>
      </Background>
    </>
  );
}
