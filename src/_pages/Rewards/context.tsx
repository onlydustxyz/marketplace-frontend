import { InfiniteData } from "@tanstack/react-query";
import { createContext, Dispatch, ReactNode, useState } from "react";
import { UseMyRewardsInfiniteListResponse } from "src/api/me/queries";
import { Money, MyReward } from "src/types";
import { getUserEarning, getUserRewards } from "./Earning/utils";
import { FilterQueryParams } from "./Filter";

export type Earning = {
  rewardedAmount?: Money;
  pendingAmount?: Money;
  receivedRewards: {
    count?: number;
    total?: number;
  };
  rewardingProjectsCount?: number;
};

type UserRewardsContextProps = {
  children: ReactNode;
};

type UserRewardsType = {
  earning?: Earning;
  rewards?: MyReward[];
  filterQueryParams: FilterQueryParams;
  setFilterQueryParams: Dispatch<FilterQueryParams>;
  setEarning: Dispatch<InfiniteData<UseMyRewardsInfiniteListResponse, unknown>>;
};

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
  setEarning: () => null,
});

export function UserRewardsProvider({ children }: UserRewardsContextProps) {
  const [earning, setEarning] = useState<Earning>();
  const [rewards, setRewards] = useState<MyReward[]>();
  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>({});

  function handleEarningChange(rewards: InfiniteData<UseMyRewardsInfiniteListResponse, unknown>) {
    setEarning(getUserEarning(rewards));
    setRewards(getUserRewards(rewards));
  }

  return (
    <UserRewardsContext.Provider
      value={{
        earning,
        rewards,
        filterQueryParams,
        setEarning: handleEarningChange,
        setFilterQueryParams,
      }}
    >
      {children}
    </UserRewardsContext.Provider>
  );
}
