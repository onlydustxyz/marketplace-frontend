import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { PageData, PagesData } from "src/types";
import { getEndpointUrl, QueryParam } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "./useHttpOptions";

type ContributionsPageData = PageData<{
  contributions: components["schemas"]["ContributionPageResponse"]["contributions"];
}>;
type ContributionsPagesData = PagesData<ContributionsPageData>;

type Props = {
  queryParams?: QueryParam[];
  enabled?: boolean;
};

export default function useInfiniteMyContributions({
  queryParams,
  enabled,
}: Props): UseInfiniteQueryResult<ContributionsPagesData, unknown> {
  const options = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["my-contributions", queryParams],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.MY_CONTRIBUTIONS,
          pageParam,
          pageSize: 10,
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
