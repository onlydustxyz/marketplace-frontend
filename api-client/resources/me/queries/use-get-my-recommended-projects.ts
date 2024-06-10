"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getMyRecommendedProjects } from "api-client/resources/me/fetch";
import { GetRecommendedProjectsPageResponse } from "api-client/resources/me/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetMyRecommendedProjects = (
  fetch: ParametersInterfaceWithReactQuery<typeof getMyRecommendedProjects>
) => {
  return useSuspenseInfiniteQuery<GetRecommendedProjectsPageResponse>(
    useReactInfiniteQueryAdapter<GetRecommendedProjectsPageResponse>(getMyRecommendedProjects(fetch))
  );
};
