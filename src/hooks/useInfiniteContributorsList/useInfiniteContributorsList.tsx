import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useTokenSet } from "src/hooks/useTokenSet";
import { Contributors } from "src/types";

interface UseInfiniteContributorsProps {
  projectId: string;
}

export function useInfiniteContributors({
  projectId,
}: UseInfiniteContributorsProps): UseInfiniteQueryResult<Contributors, unknown> {
  const { tokenSet } = useTokenSet();
  const scheme = "https://";
  const apiBasepath = import.meta.env.VITE_ONLYDUST_API_BASEPATH;
  const url = `${scheme}${apiBasepath}/api/v1/projects/${projectId}/contributors`;

  const option = {
    method: "GET",
    headers: {
      ...(tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet.accessToken}` } : {}),
    },
  };

  function getEndpointUrl() {}
  function getOptions() {}

  return useInfiniteQuery({
    queryKey: ["contributors"],
    queryFn: ({ pageParam }) => fetch(`${url}?page_index=${pageParam}&page_size=15`, option).then(res => res.json()),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
  });
}
