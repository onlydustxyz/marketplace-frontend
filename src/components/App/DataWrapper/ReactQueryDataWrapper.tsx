import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useTokenSet } from "src/hooks/useTokenSet";
import DataDisplay from "./DataDisplay";

type QueryParam = {
  key: string;
  value: string[];
};
export interface ReactQueryDataWrapperProps {
  children: ReactNode;
  param?: string;
  resourcePath?: string;
  queryParams?: QueryParam[];
}

function buildQueryString(queryParams: QueryParam[]): string {
  return queryParams
    .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value.join(","))}`)
    .join("&");
}

export default function ReactQueryDataWrapper({
  children,
  param,
  resourcePath,
  queryParams = [],
}: ReactQueryDataWrapperProps) {
  const { tokenSet } = useTokenSet();
  const scheme = "https://";
  const apiBasepath = import.meta.env.VITE_ONLYDUST_API_BASEPATH;
  const queryString = buildQueryString(queryParams);
  const url = `${scheme}${apiBasepath}${resourcePath}${param ? `${param}` : ""}${queryString ? `?${queryString}` : ""}`;
  const option = tokenSet?.accessToken
    ? {
        headers: {
          Authorization: `Bearer ${tokenSet.accessToken}`,
        },
      }
    : {};

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData", queryString],
    queryFn: () => fetch(url, option).then(res => res.json()),
  });

  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(isLoading);
  }, [isLoading]);

  return (
    <DataDisplay param={param} data={data} loading={loading} queryLoading={isLoading} error={error}>
      {children}
    </DataDisplay>
  );
}
