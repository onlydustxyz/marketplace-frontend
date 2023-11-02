type QueryParamsValue = string | number | boolean;

export type QueryParams = Record<string, QueryParamsValue | QueryParamsValue[]>;

interface EndpointUrlParams {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  pageParam?: number;
  pageSize?: number;
}

function buildQueryString(queryParams: QueryParams): string {
  return queryParams
    .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value.join(","))}`)
    .join("&");
}

export function getEndpointUrl({
  resourcePath,
  pathParam = "",
  queryParams = {},
  pageParam,
  pageSize = 15,
}: EndpointUrlParams): string {
  const scheme = "https://";
  const apiBasepath = import.meta.env.VITE_ONLYDUST_API_BASEPATH as string;
  const basePath = `${scheme}${apiBasepath}`;
  const queryString = buildQueryString(queryParams);
  const pageQuery = pageParam != null ? `pageIndex=${pageParam}&pageSize=${pageSize}` : "";
  const separator = queryString || pageQuery ? "?" : "";
  const ampersand = queryString && pageQuery ? "&" : "";

  let finalResourcePath = "";

  if (typeof pathParam === "string") {
    finalResourcePath = resourcePath.replace("{{id}}", pathParam);
  } else {
    finalResourcePath = Object.entries(pathParam).reduce(
      (acc, [key, value]) => acc.replace(`{{${key}}}`, value),
      resourcePath
    );
  }

  return `${basePath}${finalResourcePath}${separator}${queryString}${ampersand}${pageQuery}`;
}
