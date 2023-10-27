import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import UserRewardTable from "src/components/UserRewardTable";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import { useMemo, useState } from "react";
import useInfiniteMyRewardList from "src/hooks/useInfiniteMyRewardList/useInfiniteMyRewardList";
import Skeleton from "src/components/Skeleton";
import ErrorFallback from "src/ErrorFallback";
import InvoiceSubmission from "./InvoiceSubmission";
import { EarningWrapper } from "./Earning/EarningWrapper";

export enum Field {
  Date = "REQUESTED_AT",
  RewardId = "CONTRIBUTION",
  Amount = "AMOUNT",
  Status = "STATUS",
}

export enum RewardStatus {
  COMPLETE = "COMPLETE",
  PENDING_INVOICE = "PENDING_INVOICE",
  PENDING_SIGNUP = "PENDING_SIGNUP",
  PROCESSING = "PROCESSING",
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

export default function Rewards() {
  const { T } = useT();

  const [sorting, setSorting] = useState({
    field: Field.Amount,
    ascending: false,
  });

  const applySorting = (field: Field, ascending: boolean) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : ascending });

  const queryParams = useMemo(
    () => [
      ...(sorting
        ? [
            { key: "sort", value: [sorting.field] },
            { key: "direction", value: [sorting.ascending ? "ASC" : "DESC"] },
          ]
        : []),
    ],
    [sorting]
  );

  const { data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMyRewardList({
    queryParams,
  });

  if (error) {
    return <ErrorFallback />;
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
          <InvoiceSubmission />
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
                  applySorting={applySorting}
                />
              )}
            </Card>
          )}
        </div>
      </Background>
    </>
  );
}
