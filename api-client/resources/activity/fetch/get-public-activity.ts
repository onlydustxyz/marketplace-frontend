import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";

import adapters from "../adapters";
import tags from "../tags";
import { ActivityAllQueryParams, GetActivityPageResponse } from "../types";

export function getPublicActivity({
  queryParams,
  pagination,
}: {
  queryParams?: ActivityAllQueryParams;
  pagination?: PaginationInterface;
}): IFetchAdapater<GetActivityPageResponse> {
  const fetchAdapter = new FetchAdapter<GetActivityPageResponse>(adapters.get_all).setTag(tags.get_all(queryParams));

  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }

  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
