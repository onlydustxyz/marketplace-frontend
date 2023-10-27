import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { components } from "src/__generated/api";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

interface useInfiniteMyRewardListProps {
  queryParams?: QueryParam[];
}

export type MyRewardsType = components["schemas"]["MyRewardsPageResponse"];

type PagesData = {
  pages: MyRewardsType[];
  pageParams: number[];
};

export default function useInfiniteMyRewardList({
  queryParams,
}: useInfiniteMyRewardListProps): UseInfiniteQueryResult<PagesData, unknown> {
  const options = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["myRewards", queryParams],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.GET_MY_REWARDS,
          pageParam,
          pageSize: 5,
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
