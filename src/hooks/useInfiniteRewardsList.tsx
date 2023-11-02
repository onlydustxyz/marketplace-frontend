import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { components } from "src/__generated/api";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { PageData, PagesData } from "src/types";
import { getEndpointUrl, QueryParam } from "src/utils/getEndpointUrl";

export type RewardPageItemType = components["schemas"]["RewardPageItemResponse"];

type RewardPageData = PageData<{ rewards: RewardPageItemType[] }>;
type RewardsPagesData = PagesData<RewardPageData>;

interface useInfiniteRewardsListProps {
  projectId: string;
  queryParams?: QueryParam[];
  enabled?: boolean;
}

export default function useInfiniteRewardsList({
  projectId,
  queryParams,
}: useInfiniteRewardsListProps): UseInfiniteQueryResult<RewardsPagesData, unknown> {
  const { options } = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["contributors", queryParams],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.PROJECT_REWARDS,
          pageParam,
          pageSize: 9,
          pathParam: projectId,
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
