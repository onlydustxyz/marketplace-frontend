import { useQuery } from "@tanstack/react-query";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useAuth } from "src/hooks/useAuth";
import { getEndpointUrl } from "src/utils/getEndpointUrl";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

interface UseRestfulDataProps {
  resourcePath: string;
  pathParam?: string;
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
  const { tokenSet } = useTokenSet();

  const option = {
    method,
    headers: {
      ...(tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet.accessToken}` } : {}),
    },
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: [resourcePath, pathParam, queryParams, method, isLoggedIn],
    queryFn: () => fetch(getEndpointUrl(resourcePath, pathParam, queryParams), option).then(res => res.json()),
    staleTime: 0,
    gcTime: 0,
  });

  return { data, isLoading, isError };
}
