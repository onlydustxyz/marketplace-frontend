import { QueryObserverOptions, QueryOptions, useQuery } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { QueryParam, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";

interface UseBaseQueryOptions<R = unknown>
  extends Omit<QueryOptions<R>, "queryKey" | "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {}

export type BaseQueryOptions<R = unknown> = Partial<UseBaseQueryOptions<R>>;

export interface UseBaseQueryProps<R = unknown> extends BaseQueryOptions<R> {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParam[];
  tags?: ReadonlyArray<unknown>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export function useBaseQuery<R = unknown>({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "GET",
  tags,
  ...queryOptions
}: UseBaseQueryProps<R>) {
  const { enabled, ...restQueryOptions } = queryOptions;
  const { isLoggedIn } = useAuth();
  const { options, isImpersonating, isValidImpersonation } = useHttpOptions(method);

  return useQuery<R>({
    queryKey: [
      ...(tags || []),
      resourcePath,
      pathParam,
      queryParams,
      isImpersonating,
      isValidImpersonation,
      isLoggedIn,
    ],
    queryFn: () =>
      fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), options)
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          throw new Error(res.statusText);
        })
        .catch(e => {
          throw new Error(e);
        }),
    staleTime: 0,
    gcTime: 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled: isImpersonating ? isValidImpersonation && enabled : enabled,
    ...restQueryOptions,
  });
}
