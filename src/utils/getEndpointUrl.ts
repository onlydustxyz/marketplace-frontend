type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

interface EndpointUrlParams {
  resourcePath: string;
  pathParam?: string;
  queryParams?: QueryParam[];
  pageParam?: number;
  pageSize?: number;
}

function buildQueryString(queryParams: QueryParam[]): string {
  return queryParams
    .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value.join(","))}`)
    .join("&");
}

export function getEndpointUrl({
  resourcePath,
  pathParam = "",
  queryParams = [],
  pageParam,
  pageSize = 15,
}: EndpointUrlParams): string {
  const scheme = "https://";
  const apiBasepath = import.meta.env.VITE_ONLYDUST_API_BASEPATH as string;
  const basePath = `${scheme}${apiBasepath}`;
  const queryString = buildQueryString(queryParams);
  const finalResourcePath = resourcePath.replace("{{id}}", pathParam);
  const pageQuery = pageParam ? `page_index=${pageParam}&page_size=${pageSize}` : "";
  const separator = queryString || pageQuery ? "?" : "";
  const ampersand = queryString && pageQuery ? "&" : "";
  return `${basePath}${finalResourcePath}${separator}${queryString}${ampersand}${pageQuery}`;
}
