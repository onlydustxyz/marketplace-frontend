import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { EcosystemProjectsPathParams, EcosystemProjectsQueryParams, GetEcosystemProjectPageResponse } from "../types";

export function getEcosystemProjectBySlug(
  pathParams: EcosystemProjectsPathParams,
  queryParams: EcosystemProjectsQueryParams
): IFetchAdapater<GetEcosystemProjectPageResponse> {
  const fetchAdapter = new FetchAdapter<GetEcosystemProjectPageResponse>(adapters.get_projects_by_slug)
    .setPathParams(pathParams)
    .setTag(tags.projects_by_slug(pathParams, queryParams));

  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }

  return fetchAdapter;
}
