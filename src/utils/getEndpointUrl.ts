export type QueryParams = ConstructorParameters<typeof URLSearchParams>[0];

interface EndpointUrlParams {
  resourcePath: string;
  pathParam?: string | Record<string, string>;
  queryParams?: QueryParams;
  pageParam?: number;
  pageSize?: number;
}

export function getEndpointUrl({
  resourcePath,
  pathParam = "",
  queryParams,
  pageParam,
  pageSize = 15,
}: EndpointUrlParams): string {
  let finalResourcePath = "";

  if (typeof pathParam === "string") {
    finalResourcePath = resourcePath.replace("{{id}}", pathParam);
  } else {
    finalResourcePath = Object.entries(pathParam).reduce(
      (acc, [key, value]) => acc.replace(`{{${key}}}`, value),
      resourcePath
    );
  }

  const urlSearchParams = new URLSearchParams(queryParams);

  if (Number.isInteger(pageParam)) {
    urlSearchParams.set("pageIndex", String(pageParam));
    urlSearchParams.set("pageSize", String(pageSize));
  }

  const urlSearchParamsStr = urlSearchParams.toString();

  const baseUrl = "http://localhost:5173/api/proxy";
  return `${baseUrl}${finalResourcePath}${urlSearchParamsStr ? `?${urlSearchParamsStr}` : ""}`;
  // return new URL(
  //   `${finalResourcePath}${urlSearchParamsStr ? `?${urlSearchParamsStr}` : ""}`,
  //   `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}`
  // ).toString();
}
