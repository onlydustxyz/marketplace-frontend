import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { PagesData } from "src/types";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions";

interface UseInfiniteContributorsProps {
  projectId: string;
}

export function useInfiniteContributors({
  projectId,
}: UseInfiniteContributorsProps): UseInfiniteQueryResult<PagesData, unknown> {
  const options = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["contributors"],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.GET_PROJECT_CONTRIBUTORS,
          pageParam,
          pageSize: 15,
          pathParam: projectId,
        }),
        options
      ).then(res => res.json()),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
  });
}
