import { gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import UserRewardTable from "src/components/UserRewardTable";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import TotalEarnings from "./TotalEarnings";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import { useMemo, useState } from "react";
import useInfiniteMyRewardList from "src/hooks/useInfiniteMyRewardList/useInfiniteMyRewardList";
import Skeleton from "src/components/Skeleton";
import ErrorFallback from "src/ErrorFallback";

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
  const { githubUserId, user } = useAuth();
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

  if (isFetching && !isFetchingNextPage) {
    return <RewardSkeleton />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  const rewards = data?.pages.flatMap(page => page.rewards) || [];

  const hasRewards = rewards && rewards.length > 0;
  const paymentRequestsNeedingInvoice = rewards?.filter(p => p.status === RewardStatus.PENDING_INVOICE) || [];
  const isPayoutSettingsInvalid = rewards?.filter(p => p.status !== RewardStatus.COMPLETE).length > 0;
  if (hasRewards === false) {
    return <Navigate to={RoutePaths.Projects} />;
  }

  const totalEarnings = hasRewards && rewards.reduce((acc, p) => acc + p.amount.total, 0);

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
          <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
          <div className="mb-10 flex flex-col-reverse items-start gap-4 xl:flex-row">
            <Card>
              {rewards && (
                <UserRewardTable
                  rewards={rewards}
                  payoutInfoMissing={isPayoutSettingsInvalid}
                  invoiceNeeded={paymentRequestsNeedingInvoice.length > 0}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  sorting={sorting}
                  applySorting={applySorting}
                />
              )}
            </Card>
            <div>
              <div className="sticky top-4 flex flex-col gap-4">
                {totalEarnings && <TotalEarnings amount={totalEarnings} />}
                {/* {paymentRequestsNeedingInvoice.length > 0 && (
                  <InvoiceSubmission
                    paymentRequests={paymentRequestsNeedingInvoice}
                    githubUserId={githubUserId || 0}
                    userInfos={user}
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
}

function RewardSkeleton() {
  return (
    <div className="h-full w-full overflow-y-auto rounded-3xl bg-space bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
        <div className="font-belwe text-3xl xl:text-5xl">
          <div className="max-w-[18%]">
            <Skeleton variant="counter" />
          </div>
        </div>

        <div className="mb-10 flex flex-col-reverse items-start gap-4 xl:flex-row">
          <div className="w-full">
            <Skeleton variant="rewards" />
          </div>
          <Skeleton variant="earnedRewards" />
        </div>
      </div>
    </div>
  );
}
