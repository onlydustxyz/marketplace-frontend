"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getUserContributionsByGithubId } from "api-client/resources/users/fetch/get-user-contributions-by-github-id";
import { UserContributionsRequestParams, UserContributionsResponse } from "api-client/resources/users/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetUserContributionsByGithubId = (
  githubId: number,
  params: UserContributionsRequestParams,
  options?: ReactQueryOptions
) => {
  const query = useReactInfiniteQueryAdapter<UserContributionsResponse>(
    getUserContributionsByGithubId(githubId, params),
    options
  );

  return useInfiniteQuery<UserContributionsResponse>(query);
};
