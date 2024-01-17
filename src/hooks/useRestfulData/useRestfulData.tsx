import {
  QueryObserverOptions,
  QueryOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  QueryKey,
} from "@tanstack/react-query";
import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useAuth0 } from "@auth0/auth0-react";
import { getHttpOptions } from "src/api/query.utils";
import { useImpersonation } from "components/features/impersonation/use-impersonation";

export interface UseRestfulDataProps<R = unknown>
  extends Omit<QueryOptions<R>, "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {
  queryKey?: QueryKey;
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export function useRestfulData<R = unknown>({
  queryKey,
  resourcePath,
  pathParam = "",
  queryParams = {},
  method = "GET",
  ...queryOptions
}: UseRestfulDataProps<R>) {
  const { enabled, ...restQueryOptions } = queryOptions;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  return useQuery<R>({
    queryKey: [...(queryKey || []), resourcePath, pathParam, queryParams, isAuthenticated],
    queryFn: async () => {
      const { options } = await getHttpOptions({
        isAuthenticated,
        method,
        getAccessToken: getAccessTokenSilently,
        impersonationHeaders: getImpersonateHeaders(),
      });

      return fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), options)
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          throw new Error(res.statusText);
        })
        .catch(e => {
          throw new Error(e);
        });
    },
    staleTime: 0,
    gcTime: 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled,
    ...restQueryOptions,
  });
}

export function useMutationRestfulData<Payload = unknown, Response = unknown>({
  resourcePath,
  pathParam = "",
  queryParams = {},
  method = "PUT",
  onSuccess,
  onError,
  onSettled,
}: UseRestfulDataProps & { onSuccess?: () => void; onError?: () => void; onSettled?: () => void }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  return useMutation({
    mutationFn: async (data: Payload): Promise<Response> => {
      const { options } = await getHttpOptions({
        isAuthenticated,
        method,
        getAccessToken: getAccessTokenSilently,
        impersonationHeaders: getImpersonateHeaders(),
      });
      return fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), {
        ...options,
        body: JSON.stringify(data),
      })
        .then(async res => {
          if (res.ok) {
            try {
              const text = await res.text();
              const data = text ? JSON.parse(text) : {}; // Try to parse the response as JSON

              return data;
            } catch (e) {
              throw new Error("Invalid response");
            }
          }

          throw new Error(res.statusText);
        })
        .catch(e => {
          throw new Error(e);
        });
    },
    onSuccess,
    onError,
    onSettled,
  });
}

type ResponseData = {
  totalPageNumber: number;
  totalItemNumber: number;
  hasMore: boolean;
  nextPageIndex: number;
};

export function useInfiniteRestfulData<R extends ResponseData>(
  {
    resourcePath,
    pageSize = 10,
    pathParam = "",
    queryParams = {},
  }: {
    resourcePath: string;
    pageSize?: number;
    pathParam?: string | Record<string, string>;
    queryParams?: QueryParams;
  },
  queryOptions: Omit<UseInfiniteQueryOptions<R>, "queryFn" | "initialPageParam" | "getNextPageParam" | "select"> &
    Partial<Pick<UseInfiniteQueryOptions<R>, "initialPageParam" | "getNextPageParam">>
) {
  const {
    queryKey,
    initialPageParam = 0,
    getNextPageParam = lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
    refetchInterval = false,
    refetchIntervalInBackground = false,
    enabled,
    ...restQueryOptions
  } = queryOptions;
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();
  return useInfiniteQuery<R>({
    queryKey: [...queryKey],
    queryFn: async ({ pageParam }) => {
      const { options } = await getHttpOptions({
        isAuthenticated,
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

          throw new Error(res.statusText);
        })
        .catch(e => {
          throw new Error(e);
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
    staleTime: 10000,
    refetchIntervalInBackground,
    enabled,
    ...restQueryOptions,
  });
}
