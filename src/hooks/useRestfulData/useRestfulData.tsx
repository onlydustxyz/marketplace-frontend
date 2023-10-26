import { QueryObserverOptions, QueryOptions, useQuery } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseRestfulDataProps<R = any>
  extends Omit<QueryOptions<R>, "queryKey" | "queryFn" | "staleTime" | "gcTime">,
    QueryObserverOptions<R> {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParam[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRestfulData<R = any>({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "GET",
  ...queryOption
}: UseRestfulDataProps<R>) {
  const { isLoggedIn } = useAuth();

  const options = useHttpOptions(method);

  const { isLoading, isError, data } = useQuery({
    queryKey: [resourcePath, pathParam, queryParams, method, isLoggedIn],
    queryFn: () => fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), options).then(res => res.json()),
    staleTime: 0,
    gcTime: 0,
    ...queryOption,
  });

  return { data, isLoading, isError };
}
