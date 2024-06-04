import { useAuth0 } from "@auth0/auth0-react";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { QueryTags } from "./query.type";
import { createFetchError, getHttpOptions, mapHttpStatusToString } from "./query.utils";

export interface useInfiniteBaseQueryProps {
  resourcePath: string;
  pageSize?: number;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  tags?: QueryTags;
}

export type useInfiniteBaseQueryOptions<R extends InfiniteQueryResponseData> = Omit<
  UseInfiniteQueryOptions<R>,
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam" | "select"
> &
  Partial<Pick<UseInfiniteQueryOptions<R>, "initialPageParam" | "getNextPageParam">>;

export type InfiniteBaseQueryOptions<R extends InfiniteQueryResponseData> = Partial<useInfiniteBaseQueryOptions<R>>;

export type InfiniteQueryResponseData = {
  totalPageNumber: number;
  totalItemNumber: number;
  hasMore: boolean;
  nextPageIndex: number;
};

export interface UseInfiniteBaseQueryProps<
  RESULT extends InfiniteQueryResponseData,
  PARAMS = unknown | undefined,
  BODY = unknown | undefined
> {
  options?: InfiniteBaseQueryOptions<RESULT>;
  params?: PARAMS;
  body?: BODY;
}

export function useInfiniteBaseQuery<R extends InfiniteQueryResponseData>(
  { resourcePath, pageSize = 10, pathParam = "", queryParams = [], tags }: useInfiniteBaseQueryProps,
  queryOptions: useInfiniteBaseQueryOptions<R>
) {
  const {
    initialPageParam = 0,
    getNextPageParam = lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
    refetchInterval = false,
    refetchIntervalInBackground = false,
    enabled,
    ...restQueryOptions
  } = queryOptions;
  const { getAccessTokenSilently, isAuthenticated, logout, isLoading } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  return useInfiniteQuery<R>({
    queryKey: [...(tags || []), queryParams, isAuthenticated],
    queryFn: async ({ pageParam }) => {
      const { options } = await getHttpOptions({
        isAuthenticated,
        logout,
        method: "GET",
        getAccessToken: getAccessTokenSilently,
        impersonationHeaders: getImpersonateHeaders(),
      });
      return fetch(
        getEndpointUrl({
          resourcePath,
          pageParam: typeof pageParam === "number" ? pageParam : 0,
          pageSize,
          pathParam,
          queryParams,
        }),
        options
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          throw createFetchError(res, mapHttpStatusToString);
        })
        .catch(e => {
          throw e;
        });
    },
    select: data => {
      // Make sure to return an object that includes the `pages` and `pageParams` properties
      return {
        pages: data.pages,
        pageParams: data.pageParams,
      };
    },

    initialPageParam,
    getNextPageParam,
    refetchInterval,
    refetchIntervalInBackground,
    enabled: !isLoading && enabled,
    ...restQueryOptions,
  });
}
