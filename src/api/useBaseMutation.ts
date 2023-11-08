import { QueryClient, QueryObserverOptions, QueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { QueryTags } from "./query.type";

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
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export interface UseMutationProps<RESULT = unknown, PARAMS = unknown, Payload = unknown> {
  options?: BaseMutationOptions<RESULT>;
  params?: PARAMS;
  body?: Payload;
}

export function useBaseMutation<Payload = unknown, Response = unknown>({
  resourcePath,
  queryParams = [],
  method = "PUT",
  onSuccess,
  onError,
  onSettled,
  invalidatesTags,
}: UseBaseMutationProps<Response>) {
  const { options } = useHttpOptions(method);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Payload): Promise<Response> => {
      return fetch(getEndpointUrl({ resourcePath, queryParams }), {
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
              console.error(err);
              throw new Error("Invalid JSON response");
            }
          }
        })
        .catch(e => {
          throw new Error(e);
        });
    },
    onSuccess: (result: Response) => {
      if (invalidatesTags && invalidatesTags.length > 0) {
        invalidatesTags.forEach(invalidate => {
          queryClient.invalidateQueries(invalidate);
        });
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
