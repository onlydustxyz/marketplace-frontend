import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryObserverOptions, QueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { QueryTags } from "./query.type";
import { createFetchError, getHttpOptions, mapHttpStatusToString } from "./query.utils";

interface UseBaseMutationOptions<R = unknown>
  extends Omit<QueryOptions<R>, "queryKey" | "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {
  onSuccess?: (result: R, client: QueryClient) => void;
  onError?: (client: QueryClient) => void;
  onSettled?: (client: QueryClient) => void;
}

export type BaseMutationOptions<R = unknown> = Partial<UseBaseMutationOptions<R>>;

export interface UseBaseMutationProps<R = unknown> extends BaseMutationOptions<R> {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  invalidatesTags?: { queryKey: QueryTags; exact: boolean }[];
  stringifiedBody?: boolean;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}
export interface BaseMutationPayload {
  resourcePath?: string;
}

export interface UseMutationProps<RESULT = unknown, PARAMS = unknown, Payload = BaseMutationPayload> {
  options?: BaseMutationOptions<RESULT>;
  params?: PARAMS;
  body?: Payload;
}

export function useBaseMutation<Payload = BaseMutationPayload, Response = unknown>({
  resourcePath,
  queryParams = [],
  method = "PUT",
  onSuccess,
  onError,
  onSettled,
  invalidatesTags,
}: UseBaseMutationProps<Response>) {
  const { getAccessTokenSilently, isAuthenticated, logout } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mutationData: Payload): Promise<Response> => {
      const { resourcePath: mutatePath, ...data } = (mutationData || {}) as BaseMutationPayload;
      const { options } = await getHttpOptions({
        isAuthenticated,
        logout,
        method,
        getAccessToken: getAccessTokenSilently,
        impersonationHeaders: getImpersonateHeaders(),
      });
      return fetch(getEndpointUrl({ resourcePath: mutatePath || resourcePath, queryParams }), {
        ...options,
        body: data ? JSON.stringify(data) : undefined,
      })
        .then(async res => {
          if (res.ok) {
            try {
              const text = await res.text();
              const data = text ? JSON.parse(text) : {}; // Try to parse the response as JSON

              return data;
            } catch (err: unknown) {
              console.error(err);
              throw new Error("Invalid JSON response");
            }
          } else {
            throw createFetchError(res, mapHttpStatusToString);
          }
        })
        .catch(e => {
          throw e;
        });
    },
    onSuccess: async (result: Response) => {
      if (invalidatesTags && invalidatesTags.length > 0) {
        await Promise.all(invalidatesTags.map(invalidate => queryClient.invalidateQueries(invalidate)));
      }

      onSuccess?.(result, queryClient);
    },
    onError: () => {
      onError?.(queryClient);
    },
    onSettled: () => {
      onSettled?.(queryClient);
    },
  });
}
