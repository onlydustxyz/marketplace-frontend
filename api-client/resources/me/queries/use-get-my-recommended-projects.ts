"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getMyRecommendedProjects } from "api-client/resources/me/fetch";
import { GetRecommendedProjectsPageResponse } from "api-client/resources/me/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetMyRecommendedProjects = ({ options = {} }: { options?: ReactQueryOptions }) => {
  const query = useReactInfiniteQueryAdapter<GetRecommendedProjectsPageResponse>(getMyRecommendedProjects(), options);

  return useSuspenseInfiniteQuery<GetRecommendedProjectsPageResponse>(query);
};
