import { QueryClient, QueryObserverOptions, QueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryParams, getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { QueryTags } from "./query.type";

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

export interface UseUploaderProps<RESULT = unknown, PARAMS = unknown> {
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
  const { options } = useHttpOptions(method);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: File): Promise<Response> => {
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
              const data = await res.json();

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
