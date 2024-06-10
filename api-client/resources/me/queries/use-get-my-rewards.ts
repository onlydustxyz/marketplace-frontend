"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getMyRewards } from "api-client/resources/me/fetch/get-my-rewards";
import { ReactQueryOptions } from "api-client/types/react-query-options";

import { GetMyRewardsPageResponse, MyRewardsQueryParams } from "../types";

export function useGetMyRewards(queryParams: MyRewardsQueryParams, options?: ReactQueryOptions) {
  const query = useReactInfiniteQueryAdapter<GetMyRewardsPageResponse>(getMyRewards(queryParams), {
    enabled: options?.enabled ?? true,
    ...options,
  });

  return useSuspenseInfiniteQuery<GetMyRewardsPageResponse>({
    ...query,
  });
}
