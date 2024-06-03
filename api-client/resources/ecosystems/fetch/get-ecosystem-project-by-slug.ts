import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";

import adapters from "../adapters";
import tags from "../tags";
import { EcosystemProjectsPathParams, EcosystemProjectsQueryParams, GetEcosystemProjectPageResponse } from "../types";

export function getEcosystemProjectBySlug(
  pathParams: EcosystemProjectsPathParams,
  queryParams: EcosystemProjectsQueryParams,
  pagination?: PaginationInterface
): IFetchAdapater<GetEcosystemProjectPageResponse> {
  const fetcher = new FetchAdapter<GetEcosystemProjectPageResponse>(adapters.get_projects_by_slug)
    .setPathParams(pathParams)
    .setParams(queryParams)
    .setTag(tags.projects_by_slug(pathParams, queryParams));

  return PaginationAdapter(fetcher, pagination).fetcher;
}
