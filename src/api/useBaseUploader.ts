import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryObserverOptions, QueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { QueryTags } from "./query.type";
import { createFetchError, getHttpOptions, mapHttpStatusToString } from "./query.utils";

interface UseBaseUploaderOptions<R = unknown>
  extends Omit<QueryOptions<R>, "queryKey" | "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {
  onSuccess?: (result: R, client: QueryClient) => void;
  onError?: (client: QueryClient) => void;
  onSettled?: (client: QueryClient) => void;
}

export type BaseUploaderOptions<R = unknown> = Partial<UseBaseUploaderOptions<R>>;

export interface UseBaseUploaderProps<R = unknown> extends BaseUploaderOptions<R> {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  invalidatesTags?: { queryKey: QueryTags; exact: boolean }[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export interface UseUploaderProps<RESULT = unknown, PARAMS = unknown | undefined> {
  options?: BaseUploaderOptions<RESULT>;
  params?: PARAMS;
  body?: File;
}

export function useBaseUploader<Response = unknown>({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "PUT",
  onSuccess,
  onError,
  onSettled,
  invalidatesTags,
}: UseBaseUploaderProps<Response>) {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently, isAuthenticated, logout } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  return useMutation({
    mutationFn: async (data: File | Blob): Promise<Response> => {
      const { options } = await getHttpOptions({
        isAuthenticated,
        logout,
        method,
        getAccessToken: getAccessTokenSilently,
        impersonationHeaders: getImpersonateHeaders(),
      });
      return fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": data.type,
        },
        body: data,
      })
        .then(async res => {
          if (res.ok) {
            try {
              const text = await res.text();
              const data = text ? JSON.parse(text) : {}; // Try to parse the response as JSON

              return data;
            } catch (e) {
              console.log("ERROR", e);
            }
          }

          throw createFetchError(res, mapHttpStatusToString);
        })
        .catch(e => {
          throw e;
        });
    },
    onSuccess: (result: Response) => {
      if (invalidatesTags && invalidatesTags.length > 0) {
        invalidatesTags.forEach(invalidate => {
          queryClient.invalidateQueries(invalidate);
        });
      }
      if (onSuccess) {
        onSuccess(result, queryClient);
      }
    },
    onError: () => {
      if (onError) {
        onError(queryClient);
      }
    },
    onSettled: () => {
      if (onSettled) {
        onSettled(queryClient);
      }
    },
  });
}
