import { useQuery } from "@tanstack/react-query";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useAuth } from "src/hooks/useAuth";

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

function buildQueryString(queryParams: QueryParam[]): string {
  return queryParams
    .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value.join(","))}`)
    .join("&");
}

export function useRestfulData({
  resourcePath,
  pathParam = "",
  queryParams = [],
  method = "GET",
}: UseRestfulDataProps) {
  const { isLoggedIn } = useAuth();
  const { tokenSet } = useTokenSet();

  const scheme = "https://";
  const apiBasepath = import.meta.env.VITE_ONLYDUST_API_BASEPATH;
  const queryString = buildQueryString(queryParams);
  const finalResourcePath = resourcePath.replace("{{id}}", pathParam);
  const url = `${scheme}${apiBasepath}${finalResourcePath}${queryString ? `?${queryString}` : ""}`;

  const option = {
    method,
    headers: {
      ...(tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet.accessToken}` } : {}),
    },
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: [resourcePath, pathParam, queryString, method, isLoggedIn],
    queryFn: () => fetch(url, option).then(res => res.json()),
    staleTime: 0,
    gcTime: 0,
  });

  return { data, isLoading, isError };
}
