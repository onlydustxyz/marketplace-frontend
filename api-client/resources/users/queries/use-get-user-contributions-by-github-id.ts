"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getUserContributionsByGithubId } from "api-client/resources/users/fetch/get-user-contributions-by-github-id";
import { UserContributionsResponse } from "api-client/resources/users/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetUserContributionsByGithubId = ({
  queryParams,
  pathParams,
  options,
  pagination,
}: ParametersInterfaceWithReactQuery<typeof getUserContributionsByGithubId>) => {
  const query = useReactInfiniteQueryAdapter<UserContributionsResponse>(
    getUserContributionsByGithubId({ pathParams, queryParams, pagination }),
    options
  );

  return useInfiniteQuery<UserContributionsResponse>(query);
};
