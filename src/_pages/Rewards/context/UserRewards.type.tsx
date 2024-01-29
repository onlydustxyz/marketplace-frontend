import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Dispatch, ReactNode } from "react";

import { components } from "src/__generated/api";
import { Fields } from "src/_pages/Rewards/UserRewardTable/Headers";
import { UseGetMeRewardCurrencies, UseMyRewardsInfiniteListResponse } from "src/api/me/queries";
import { useQueryParamsSortingReturn } from "src/components/RewardTable/useQueryParamsSorting";
import { Money, MyReward } from "src/types";

import { FilterQueryParams } from "../Filter";

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
  rewards: MyReward[];
  filterQueryParams: FilterQueryParams;
  setFilterQueryParams: Dispatch<FilterQueryParams>;
  dateSorting: useQueryParamsSortingReturn<Fields>;
  query: UseInfiniteQueryResult<InfiniteData<UseMyRewardsInfiniteListResponse>>;
  projects: components["schemas"]["ShortProjectResponse"][];
  currencies: UseGetMeRewardCurrencies["currencies"];
};
