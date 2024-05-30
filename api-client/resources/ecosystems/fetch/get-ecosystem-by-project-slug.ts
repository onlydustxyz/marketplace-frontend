import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { EcosystemProjectPathParams, EcosystemProjectQueryParams, GetEcosystemProjectPageResponse } from "../types";

export function getEcosystemByProjectSlug(
  pathParams: EcosystemProjectPathParams,
  queryParams: EcosystemProjectQueryParams
): IFetchAdapater<GetEcosystemProjectPageResponse> {
  return new FetchAdapter<GetEcosystemProjectPageResponse>(adapters.get_projects_by_slug)
    .setPathParams(pathParams)
    .setParams(queryParams)
    .setTag(tags.projects_by_slug(pathParams, queryParams));
}
