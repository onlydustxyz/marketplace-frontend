import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Dispatch, ReactNode } from "react";
import { UseMyRewardsInfiniteListResponse } from "src/api/me/queries";
import { Money, MyReward } from "src/types";
import { FilterQueryParams } from "../Filter";
import { useQueryParamsSortingReturn } from "src/components/RewardTable/useQueryParamsSorting";
import { Fields } from "src/components/UserRewardTable/Headers";

export type Earning = {
  rewardedAmount?: Money;
  pendingAmount?: Money;
  receivedRewards: {
    count?: number;
    total?: number;
  };
  rewardingProjectsCount?: number;
};

export type UserRewardsContextProps = {
  children: ReactNode;
};

export type UserRewardsType = {
  earning?: Earning;
  rewards?: MyReward[];
  filterQueryParams: FilterQueryParams;
  setFilterQueryParams: Dispatch<FilterQueryParams>;
  dateSorting: useQueryParamsSortingReturn<Fields>;
  query: UseInfiniteQueryResult<InfiniteData<UseMyRewardsInfiniteListResponse>>;
};
