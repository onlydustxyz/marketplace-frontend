import { useContext, useMemo, useRef } from "react";
import { useT } from "talkr";

import UserRewardTable from "src/_pages/Rewards/UserRewardTable";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import Flex from "src/components/Utils/Flex";

import { Earning } from "./Earning/Earning";
import UseRewardsEmptyState from "./Empty";
import { UserRewardsFilter, UserRewardsFilterRef } from "./Filter";
import InvoiceSubmission from "./InvoiceSubmission";
import { UserRewardsContext } from "./context/UserRewards";
import { UserRewardsProvider } from "./context/UserRewards.provider";

export enum RewardStatus {
  COMPLETE = "COMPLETE",
  PENDING_INVOICE = "PENDING_INVOICE",
  PENDING_SIGNUP = "PENDING_SIGNUP",
  PROCESSING = "PROCESSING",
}

function SafeRewards() {
  const { T } = useT();
  const { rewards } = useContext(UserRewardsContext);
  const filterRef = useRef<UserRewardsFilterRef>(null);
  const hasActiveFilters = !!filterRef?.current?.hasActiveFilters;

  const emptyFallback = useMemo(
    () =>
      rewards?.length === 0 ? (
        <UseRewardsEmptyState activeFilter={hasActiveFilters} activeFilterButtonEvent={filterRef.current?.reset} />
      ) : undefined,
    [hasActiveFilters, filterRef, rewards]
  );

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
        <Flex className="items-center justify-between">
          <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
          <UserRewardsFilter ref={filterRef} />
        </Flex>
        <InvoiceSubmission />
        <Earning />
        <UserRewardTable emptyState={emptyFallback} />
      </div>
    </Background>
  );
}

export default function Rewards() {
  return (
    <UserRewardsProvider>
      <SEO />
      <SafeRewards />
    </UserRewardsProvider>
  );
}
