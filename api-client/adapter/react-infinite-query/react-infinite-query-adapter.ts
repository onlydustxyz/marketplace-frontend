"use client";

import { infiniteQueryOptions } from "@tanstack/react-query";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { useReactQueryAuthAdapter } from "api-client/adapter/react-query-auth/react-query-auth-adapter";
import { ReactQueryOptions } from "api-client/types/react-query-options";

interface BaseResponse {
  hasMore: boolean;
  totalPageNumber: number;
  totalItemNumber: number;
  nextPageIndex: number;
}

export const useReactInfiniteQueryAdapter = <T extends BaseResponse>(
  fetchAdapter: IFetchAdapater<T>,
  options?: ReactQueryOptions
) => {
  const { fetcher } = useReactQueryAuthAdapter(fetchAdapter);

  return infiniteQueryOptions<T>({
    queryKey: fetcher.tag ? [fetcher.tag] : [],
    queryFn: ({ pageParam = 0 }) => fetcher.setParams({ pageIndex: `${pageParam}` }).request(),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
    select: data => {
      // Make sure to return an object that includes the `pages` and `pageParams` properties
      return {
        pages: data.pages,
        pageParams: data.pageParams,
      };
    },
    ...options,
  });
};
