"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ListProjectsParameters, ListProjectsResponse } from "api-client/resources/projects/types";

import adapters from "../adapters";
import tags from "../tags";

export const useGetProjectsList = (params: Partial<ListProjectsParameters>) => {
  const fetcher = useReactQueryAdapter(adapters.root());

  return useInfiniteQuery<ListProjectsResponse>({
    queryKey: [tags.root, [{ params }]],
    queryFn: ({ pageParam = 0 }) =>
      fetcher.get({
        params: {
          pageSize: "15",
          ...params,
          pageIndex: `${pageParam}`,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
    select: data => {
      // Make sure to return an object that includes the `pages` and `pageParams` properties
      return {
        pages: data.pages,
        pageParams: data.pageParams,
      };
    },
  });
  // return useQuery<ListHackathonsResponse>({
  //   queryKey: [tags.root],
  //   queryFn: () => fetcher.get(),
  // });
};
