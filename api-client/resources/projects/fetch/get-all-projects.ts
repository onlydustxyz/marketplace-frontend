import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetProjectPageResponse, ProjectsGetAllQueryParams } from "../types";

export function getAllProjects(
  queryParams: ProjectsGetAllQueryParams,
  pagination?: PaginationInterface
): IFetchAdapater<GetProjectPageResponse> {
  const fetchAdapter = new FetchAdapter<GetProjectPageResponse>(adapters.get_all).setTag(tags.get_all(queryParams));

  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }

  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
