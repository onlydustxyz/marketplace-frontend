import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

interface UseRestfulDataProps {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParam[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export function useRestfulData({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "GET",
}: UseRestfulDataProps) {
  const { isLoggedIn } = useAuth();

  const options = useHttpOptions(method);

  const { isLoading, isError, data } = useQuery({
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
  });

  return { data, isLoading, isError };
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
