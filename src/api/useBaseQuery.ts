import { useAuth0 } from "@auth0/auth0-react";
import { QueryObserverOptions, QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { QueryTags } from "./query.type";
import { createFetchError, getHttpOptions, mapHttpStatusToString } from "./query.utils";

interface UseBaseQueryOptions<R = unknown>
  extends Omit<QueryOptions<R>, "queryKey" | "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {}

export type BaseQueryOptions<R = unknown> = Partial<UseBaseQueryOptions<R>>;

export interface UseBaseQueryProps<R = unknown> extends BaseQueryOptions<R> {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  tags?: QueryTags;
  callbackTags?: (result: R) => QueryTags;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export interface UseQueryProps<RESULT = unknown, PARAMS = unknown | undefined, BODY = unknown | undefined> {
  options?: BaseQueryOptions<RESULT>;
  params?: PARAMS;
  body?: BODY;
}

export function useBaseQuery<R = unknown>({
  resourcePath,
  queryParams = [],
  method = "GET",
  tags,
  callbackTags,
  ...queryOptions
}: UseBaseQueryProps<R>) {
  const queryClient = useQueryClient();

  const { enabled, ...restQueryOptions } = queryOptions;
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { getImpersonateHeaders, isImpersonating } = useImpersonation();

  return useQuery<R>({
    queryKey: [...(tags || []), resourcePath, queryParams, isAuthenticated, isImpersonating],
    queryFn: async () => {
      const { options } = await getHttpOptions({
        isAuthenticated,
        method,
        logout,
        getAccessToken: getAccessTokenSilently,
        impersonationHeaders: getImpersonateHeaders(),
      });

      return fetch(getEndpointUrl({ resourcePath, queryParams }), options)
        .then(res => {
          if (res.ok) {
            if (res.headers.get("Content-Type") === "application/pdf") {
              return res.blob();
            }
            return res.json();
          }

          throw createFetchError(res, mapHttpStatusToString);
        })
        .then(data => {
          if (callbackTags) {
            const generatedTags = callbackTags(data);
            queryClient.setQueryData([...generatedTags], data);
          }
          return data;
        })
        .catch(e => {
          throw e;
        });
    },
    staleTime: 20000,
    gcTime: 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled,
    ...restQueryOptions,
  });
}
