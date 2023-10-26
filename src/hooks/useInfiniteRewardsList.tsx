import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useHttpOptions } from "./useHttpOptions";
import { getEndpointUrl, QueryParam } from "src/utils/getEndpointsUrl";
import { components } from "src/__generated/api";
import { PageData, PagesData } from "src/types";

export type RewardPageItemType = components["schemas"]["RewardPageItemResponse"];

type RewardPageData = {
  rewards: RewardPageItemType[];
} & PageData;

type RewardsPagesData = {
  pages: RewardPageData[];
} & PagesData;

interface useInfiniteRewardsListProps {
  projectId: string;
  queryParams?: QueryParam[];
  enabled?: boolean;
}

export default function useInfiniteRewardsList({
  projectId,
  queryParams,
}: useInfiniteRewardsListProps): UseInfiniteQueryResult<RewardsPagesData, unknown> {
  const options = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["contributors", queryParams],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.GET_PROJECT_REWARDS_LIST,
          pageParam,
          pageSize: 9,
          pathParam: projectId,
          queryParams,
        }),
        options
      ).then(res => res.json()),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
  });
}
