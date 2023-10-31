import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { components } from "src/__generated/api";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { PageData, PagesData } from "src/types";
import { getEndpointUrl, QueryParam } from "src/utils/getEndpointUrl";

type RewardPageData = PageData<{ rewardItems: components["schemas"]["RewardItemResponse"][] }>;
type RewardsPagesData = PagesData<RewardPageData>;

type Props = {
  rewardId: string;
  queryParams?: QueryParam[];
  enabled?: boolean;
};

type ProjectProps = {
  projectId: string;
  isMine?: never;
} & Props;

type MyProps = {
  projectId?: never;
  isMine: true;
} & Props;

export default function useInfiniteRewardItems({
  projectId,
  rewardId,
  queryParams,
  enabled,
  isMine,
}: ProjectProps | MyProps): UseInfiniteQueryResult<RewardsPagesData, unknown> {
  const options = useHttpOptions("GET");

  const queryKey = isMine
    ? ["my-reward-items", rewardId, queryParams]
    : ["project-reward-items", projectId, rewardId, queryParams];

  const resourcePath = isMine ? ApiResourcePaths.GET_MY_REWARD_ITEMS_BY_ID : ApiResourcePaths.GET_PROJECT_REWARD_ITEMS;
  const pathParam = isMine ? rewardId : { projectId, rewardId };

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath,
          pageParam,
          pageSize: 10,
          pathParam,
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
    enabled,
  });
}
