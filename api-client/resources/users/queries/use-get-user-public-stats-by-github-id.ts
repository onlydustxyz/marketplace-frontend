"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicStats } from "api-client/resources/users/fetch";
import { UserPublicStatsResponse } from "api-client/resources/users/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetUserPublicStatsByGithubId = (
  githubId: number,
  ecosystemId?: string,
  options?: ReactQueryOptions
) => {
  const { query } = useReactQueryAdapter<UserPublicStatsResponse>(getUserPublicStats(githubId, ecosystemId), options);

  return useQuery<UserPublicStatsResponse>({
    ...query,
    refetchOnWindowFocus: false,
  });
};
