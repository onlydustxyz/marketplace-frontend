import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { createContext } from "react";

import { UseMyRewardsInfiniteListResponse } from "src/api/me/queries";

import { UserRewardsType } from "./UserRewards.type";

export const UserRewardsContext = createContext<UserRewardsType>({
  earning: {
    rewardedAmount: undefined,
    pendingAmount: undefined,
    receivedRewards: {
      count: undefined,
      total: undefined,
    },
    rewardingProjectsCount: undefined,
  },
  rewards: [],
  filterQueryParams: {},
  setFilterQueryParams: () => null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateSorting: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: {} as any as UseInfiniteQueryResult<InfiniteData<UseMyRewardsInfiniteListResponse>>,
  currencies: [],
  projects: [],
});
