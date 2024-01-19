import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import { UserRewardTable } from "src/_pages/Rewards/UserRewardTable";
import Flex from "src/components/Utils/Flex";
import { useT } from "talkr";
import { UserRewardsProvider } from "./context/UserRewards.provider";
import { Earning } from "./Earning/Earning";
import { UserRewardsFilter, UserRewardsFilterRef } from "./Filter";
import InvoiceSubmission from "./InvoiceSubmission";
import { useContext, useMemo, useRef } from "react";
import { UserRewardsContext } from "./context/UserRewards";
import { EmptyState } from "components/layout/placeholders/empty-state";
import { IMAGES } from "src/assets/img";

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

  const emptyFallback = useMemo(() => {
    if (rewards && rewards?.length === 0) {
      if (hasActiveFilters) {
        return (
          <EmptyState
            illustrationSrc={IMAGES.global.payment}
            titleToken="myRewards.tableFallback.withFilter.title"
            descriptionToken="myRewards.tableFallback.withFilter.message"
            actionLabelToken="myRewards.tableFallback.withFilter.buttonLabel"
            onAction={filterRef.current?.reset}
          />
        );
      }
      return (
        <EmptyState
          illustrationSrc={IMAGES.global.payment}
          titleToken="myRewards.tableFallback.title"
          descriptionToken="myRewards.tableFallback.message"
        />
      );
    }
    return undefined;
  }, [hasActiveFilters, filterRef, rewards]);

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
