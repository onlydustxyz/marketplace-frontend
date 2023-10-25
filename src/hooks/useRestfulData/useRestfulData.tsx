import { useQuery } from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

export interface UseRestfulDataProps {
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
    queryFn: () => fetch(getEndpointUrl({ resourcePath, pathParam, queryParams }), options).then(res => res.json()),
    staleTime: 0,
    gcTime: 0,
  });

  return { data, isLoading, isError };
}
