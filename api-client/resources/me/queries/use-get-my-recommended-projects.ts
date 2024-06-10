"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getMyRecommendedProjects } from "api-client/resources/me/fetch";
import { GetRecommendedProjectsPageResponse } from "api-client/resources/me/types";

type Params = Parameters<typeof getMyRecommendedProjects>;

export const useGetMyRecommendedProjects = ({ params }: { params: Params[0] }) => {
  const query = useReactInfiniteQueryAdapter<GetRecommendedProjectsPageResponse>(getMyRecommendedProjects(params));

  return useSuspenseInfiniteQuery<GetRecommendedProjectsPageResponse>({
    ...query,
  });
};
