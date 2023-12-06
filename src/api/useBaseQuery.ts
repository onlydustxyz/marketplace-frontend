import { QueryObserverOptions, QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { QueryTags } from "./query.type";

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

export enum HttpStatusStrings {
  OK = "OK",
  NO_CONTENT = "NO_CONTENT",
  PARTIAL_CONTENT = "PARTIAL_CONTENT",
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
}

function mapHttpStatusToString(statusCode: number): HttpStatusStrings | null {
  const statusMap: { [key: number]: HttpStatusStrings } = {
    200: HttpStatusStrings.OK,
    204: HttpStatusStrings.NO_CONTENT,
    206: HttpStatusStrings.PARTIAL_CONTENT,
    400: HttpStatusStrings.BAD_REQUEST,
    403: HttpStatusStrings.FORBIDDEN,
    404: HttpStatusStrings.NOT_FOUND,
    409: HttpStatusStrings.CONFLICT,
    500: HttpStatusStrings.INTERNAL_SERVER_ERROR,
    501: HttpStatusStrings.NOT_IMPLEMENTED,
  };

  return statusMap[statusCode] || null;
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
    queryFn: () =>
      fetch(getEndpointUrl({ resourcePath, queryParams }), options)
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          throw { status: res.status, message: res.statusText, errorType: mapHttpStatusToString(res.status) };
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
        }),
    staleTime: 10000,
    gcTime: 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled: isImpersonating ? isValidImpersonation && enabled : enabled,
    ...restQueryOptions,
  });
}
