import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { PageData, PagesData } from "src/types";
import { getEndpointUrl, QueryParam } from "src/utils/getEndpointsUrl";
import { useHttpOptions } from "./useHttpOptions";

type RewardPageData = PageData<{ rewardItems: components["schemas"]["RewardItemResponse"][] }>;
type RewardsPagesData = PagesData<RewardPageData>;

type Props = {
  projectId: string;
  rewardId: string;
  queryParams?: QueryParam[];
};

export default function useInfiniteProjectRewardItems({
  projectId,
  rewardId,
  queryParams,
}: Props): UseInfiniteQueryResult<RewardsPagesData, unknown> {
  const options = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["project-reward-items", queryParams],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.GET_PROJECT_REWARD_ITEMS,
          pageParam,
          pageSize: 10,
          pathParam: { projectId, rewardId },
          queryParams,
        }),
        options
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          throw new Error(res.statusText);
        })
        .catch(e => {
          throw new Error(e);
        }),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
  });
}
