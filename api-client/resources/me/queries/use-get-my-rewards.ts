"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getMyRewards } from "api-client/resources/me/fetch/get-my-rewards";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { GetMyRewardsPageResponse } from "../types";

export const useGetMyRewards = ({ options, ...fetch }: ParametersInterfaceWithReactQuery<typeof getMyRewards>) => {
  return useSuspenseInfiniteQuery<GetMyRewardsPageResponse>(
    useReactInfiniteQueryAdapter<GetMyRewardsPageResponse>(getMyRewards(fetch), options)
  );
};
