import { QueryObserverOptions, QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { QueryTags } from "./query.type";
import { createFetchError, getHttpOptions, mapHttpStatusToString } from "./query.utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useImpersonationClaims } from "../../components/features/auth0/impersonation/use-impersonation-claims-Bis.tsx";

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
  const { isAuthenticated } = useAuth0();
  const { isImpersonating, isValidImpersonation } = useHttpOptions(method);
  const { getIdTokenClaims } = useAuth0();
  const { getImpersonationHeaders } = useImpersonationClaims();
  const impersonationHeaders = { sub: "" };

  return useQuery<R>({
    queryKey: [...(tags || []), resourcePath, queryParams, isImpersonating, isValidImpersonation, isAuthenticated],
    queryFn: async () => {
      const { options } = await getHttpOptions({ method, getIdToken: getIdTokenClaims, impersonationHeaders });
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
