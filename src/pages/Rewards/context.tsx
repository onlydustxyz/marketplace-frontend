import { InfiniteData } from "@tanstack/react-query";
import { createContext, Dispatch, ReactNode, useState } from "react";
import { UseMyRewardsInfiniteListResponse } from "src/api/me/queries";
import { Money, MyReward } from "src/types";
import { getUserEarning, getUserRewards } from "./Earning/utils";

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
  //TODO: pass filters to table queryParams
  filters: any;
  earning?: Earning;
  setEarning: Dispatch<InfiniteData<UseMyRewardsInfiniteListResponse, unknown>>;
  rewards?: MyReward[];
};

export const UserRewardsContext = createContext<UserRewardsType>({
  filters: null,
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
  setEarning: () => null,
});

export function UserRewardsProvider({ children }: UserRewardsContextProps) {
  const [earning, setEarning] = useState<Earning>();
  const [rewards, setRewards] = useState<MyReward[]>();

  function handleEarningChange(rewards: InfiniteData<UseMyRewardsInfiniteListResponse, unknown>) {
    setEarning(getUserEarning(rewards));
    setRewards(getUserRewards(rewards));
  }

  return (
    <UserRewardsContext.Provider
      value={{
        filters: null,
        earning,
        rewards,
        setEarning: handleEarningChange,
      }}
    >
      {children}
    </UserRewardsContext.Provider>
  );
}
