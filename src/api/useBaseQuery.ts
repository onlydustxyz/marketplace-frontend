import { QueryObserverOptions, QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { QueryTags } from "./query.type";
import { createFetchError, mapHttpStatusToString } from "./query.utils";
import { getAccessToken } from "./getAccessToken.ts";

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
  const { isLoggedIn } = useAuth();
  const { options, isImpersonating, isValidImpersonation } = useHttpOptions(method);

  return useQuery<R>({
    queryKey: [...(tags || []), resourcePath, queryParams, isImpersonating, isValidImpersonation, isLoggedIn],
    queryFn: async () => {
      console.log("start retrievedAccessToken ===>");
      const retrievedAccessToken = await getAccessToken();
      console.log("end retrievedAccessToken ===>", retrievedAccessToken);

      return fetch(getEndpointUrl({ resourcePath, queryParams }), options)
        .then(res => {
          if (res.ok) {
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
          console.log("error ===>", e);
          throw e;
        });
    },
    staleTime: 20000,
    gcTime: 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled: isImpersonating ? isValidImpersonation && enabled : enabled,
    ...restQueryOptions,
  });
}
