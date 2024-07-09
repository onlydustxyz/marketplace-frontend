import { apiResources } from "api-client/config/resources";

export function createTag(
  resource: apiResources,
  name: string,
  pathParams?: Record<string, unknown> | null,
  queryParams?: Record<string, unknown>
) {
  return `${resource}-${name}-${pathParams ? JSON.stringify(pathParams) : ""}-${
    queryParams ? JSON.stringify(queryParams) : ""
  }`;
}
