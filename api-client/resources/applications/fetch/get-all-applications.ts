import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { ApplicationsGetAllQueryParams, GetApplicationPageResponse } from "../types";

export function getAllApplications({
  queryParams,
  pagination,
}: ParametersInterface<{
  QueryParams: ApplicationsGetAllQueryParams;
}>): IFetchAdapater<GetApplicationPageResponse> {
  const fetchAdapter = new FetchAdapter<GetApplicationPageResponse>(adapters.get_all).setTag(tags.get_all(queryParams));

  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }

  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
