"use client";

import { useContext, useEffect, useMemo, useRef } from "react";
import { useT } from "talkr";

import { UserRewardTable } from "src/_pages/Rewards/UserRewardTable";
import { RequestPayment } from "src/_pages/Rewards/request-payment/request-payment";
import { IMAGES } from "src/assets/img";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import Flex from "src/components/Utils/Flex";
import { usePosthog } from "src/hooks/usePosthog";

import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

import { Earning } from "./Earning/Earning";
import { UserRewardsFilter, UserRewardsFilterRef } from "./Filter";
import { UserRewardsContext } from "./context/UserRewards";
import { UserRewardsProvider } from "./context/UserRewards.provider";

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
            title={{ token: "myRewards.tableFallback.withFilter.title" }}
            description={{ token: "myRewards.tableFallback.withFilter.message" }}
            actionLabel={{ token: "myRewards.tableFallback.withFilter.buttonLabel" }}
            onAction={filterRef.current?.reset}
          />
        );
      }
      return (
        <EmptyState
          illustrationSrc={IMAGES.global.payment}
          title={{ token: "myRewards.tableFallback.title" }}
          description={{ token: "myRewards.tableFallback.message" }}
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
          <div className="item-center flex flex-row justify-end gap-3">
            <UserRewardsFilter ref={filterRef} />
            <RequestPayment />
          </div>
        </Flex>
        <Earning />
        <UserRewardTable emptyState={emptyFallback} />
      </div>
    </Background>
  );
}

export default function Rewards() {
  const { capture } = usePosthog();

  useEffect(() => {
    capture("reward_list_viewed");
  }, []);

  return (
    <UserRewardsProvider>
      <SEO />
      <SafeRewards />
    </UserRewardsProvider>
  );
}
