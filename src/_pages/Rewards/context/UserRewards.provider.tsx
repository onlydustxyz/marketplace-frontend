import { useMemo, useState } from "react";

import { Fields } from "src/_pages/Rewards/UserRewardTable/Headers";
import MeApi from "src/api/me";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";

import { FilterQueryParams } from "../Filter";
import { UserRewardsContext } from "./UserRewards";
import { UserRewardsContextProps } from "./UserRewards.type";

export function UserRewardsProvider({ children }: UserRewardsContextProps) {
  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>({});

  const dateSorting = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "myRewardsSorting",
  });

  const myRewardsInfiniteList = MeApi.queries.useMyRewardsInfiniteList({
    queryParams: {
      ...(dateSorting.queryParams as URLSearchParams),
      ...filterQueryParams,
    },
  });

  const { data: projectsData } = MeApi.queries.useGetMeRewardProjects({});
  const { data: currenciesData } = MeApi.queries.useGetMeRewardCurrencies({});
  const orderedCurrencies = useCurrenciesOrder({
    currencies: currenciesData?.currencies.map(c => ({
      currency: c,
    })),
  });
  const rewards = useMemo(
    () => myRewardsInfiniteList.data?.pages.flatMap(page => page.rewards) || [],
    [myRewardsInfiniteList]
  );

  const earning = useMemo(
    () => ({
      rewardedAmount: myRewardsInfiniteList.data?.pages[0].rewardedAmount,
      pendingAmount: myRewardsInfiniteList.data?.pages[0].pendingAmount,
      receivedRewards: {
        count: myRewardsInfiniteList.data?.pages[0].receivedRewardsCount,
        total: myRewardsInfiniteList.data?.pages[0].rewardedContributionsCount,
      },
      rewardingProjectsCount: myRewardsInfiniteList.data?.pages[0].rewardingProjectsCount,
    }),
    [myRewardsInfiniteList]
  );

  return (
    <UserRewardsContext.Provider
      value={{
        earning,
        rewards,
        filterQueryParams,
        setFilterQueryParams,
        dateSorting,
        query: myRewardsInfiniteList,
        currencies: orderedCurrencies.map(c => c.currency) || [],
        projects: projectsData?.projects || [],
      }}
    >
      {children}
    </UserRewardsContext.Provider>
  );
}
