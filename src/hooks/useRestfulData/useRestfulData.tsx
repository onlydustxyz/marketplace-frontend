import { QueryObserverOptions, QueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

export interface UseRestfulDataProps<R = unknown>
  extends Omit<QueryOptions<R>, "queryKey" | "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParam[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export function useRestfulData<R = unknown>({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "GET",
  ...queryOption
}: UseRestfulDataProps<R>) {
  const { isLoggedIn } = useAuth();

  const options = useHttpOptions(method);

  const { isLoading, isError, data, ...rest } = useQuery<R>({
    queryKey: [resourcePath, pathParam, queryParams, method, isLoggedIn],
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
    ...queryOption,
  });

  return { data, isLoading, isError, ...rest };
}

export function useMutationRestfulData<Payload = unknown, Response = unknown>({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "PUT",
  onSuccess,
  onError,
}: UseRestfulDataProps & { onSuccess?: () => void; onError?: () => void }) {
  const options = useHttpOptions(method);
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: Payload): Promise<Response> => {
      return fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), {
        ...options,
        body: JSON.stringify(data),
      })
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
    onSuccess,
    onError,
  });

  return { mutate, isPending, error };
}
