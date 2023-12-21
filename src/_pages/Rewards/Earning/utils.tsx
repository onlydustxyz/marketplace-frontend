import { InfiniteData } from "@tanstack/react-query";
import { UseMyRewardsInfiniteListResponse } from "src/api/me/queries";
import { Earning } from "../context/UserRewards.provider";

export function getUserEarning(data: InfiniteData<UseMyRewardsInfiniteListResponse, unknown>): Earning {
  return {
    rewardedAmount: data?.pages[0].rewardedAmount,
    pendingAmount: data?.pages[0].pendingAmount,
    receivedRewards: {
      count: data?.pages[0].receivedRewardsCount,
      total: data?.pages[0].rewardedContributionsCount,
    },
    rewardingProjectsCount: data?.pages[0].rewardingProjectsCount,
  };
}

export function getUserRewards(data: InfiniteData<UseMyRewardsInfiniteListResponse, unknown>) {
  return data?.pages.flatMap(page => page.rewards);
}
