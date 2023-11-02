import {
  QueryObserverOptions,
  QueryOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  QueryKey,
} from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { getEndpointUrl } from "src/utils/getEndpointUrl";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

export interface UseRestfulDataProps<R = unknown>
  extends Omit<QueryOptions<R>, "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {
  queryKey?: QueryKey;
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParam[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export function useRestfulData<R = unknown>({
  queryKey,
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "GET",
  ...queryOptions
}: UseRestfulDataProps<R>) {
  const { enabled, ...restQueryOptions } = queryOptions;
  const { isLoggedIn } = useAuth();
  const { options, isImpersonating, isValidImpersonation } = useHttpOptions(method);

  return useQuery<R>({
    queryKey: [
      ...(queryKey || []),
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

export function useMutationRestfulData<Payload = unknown, Response = unknown>({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "PUT",
  onSuccess,
  onError,
  onSettled,
}: UseRestfulDataProps & { onSuccess?: () => void; onError?: () => void; onSettled?: () => void }) {
  const { options } = useHttpOptions(method);

  return useMutation({
    mutationFn: (data: Payload): Promise<Response> => {
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
            } catch (err: unknown) {
              console.log("ERROR", err);
            }
          }
        })
        .catch(e => {
          console.log("Error!!", e);
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
    queryParams = [],
  }: {
    resourcePath: string;
    pageSize?: number;
    pathParam?: string | Record<string, string>;
    queryParams?: QueryParam[];
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
  const { options, isImpersonating, isValidImpersonation } = useHttpOptions("GET");

  return useInfiniteQuery<R>({
    queryKey: [isImpersonating, isValidImpersonation, ...queryKey],
    queryFn: ({ pageParam }) =>
      fetch(
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
        }),
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
    enabled: isImpersonating ? isValidImpersonation && enabled : enabled,
    ...restQueryOptions,
  });
}
