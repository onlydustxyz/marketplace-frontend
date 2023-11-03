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

  return new URL(
    `${finalResourcePath}${urlSearchParamsStr ? `?${urlSearchParamsStr}` : ""}`,
    `https://${import.meta.env.VITE_ONLYDUST_API_BASEPATH}`
  ).toString();
}
