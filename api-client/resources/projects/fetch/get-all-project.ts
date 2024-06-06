import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetAllProjectResponse, ProjectsPageQueryParams } from "../types";

export function getAllProject(
  queryParams: ProjectsPageQueryParams,
  pagination?: PaginationInterface
): IFetchAdapater<GetAllProjectResponse> {
  const fetchAdapter = new FetchAdapter<GetAllProjectResponse>(adapters.get_projects).setTag(tags.all(queryParams));

  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }

  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
