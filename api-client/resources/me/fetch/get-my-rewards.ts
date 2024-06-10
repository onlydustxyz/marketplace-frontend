import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetMyRewardsPageResponse, MyRewardsQueryParams } from "../types";

export function getMyRewards({
  queryParams,
  pagination,
}: {
  queryParams: MyRewardsQueryParams;
  pagination?: PaginationInterface;
}): IFetchAdapater<GetMyRewardsPageResponse> {
  const fetchAdapter = new FetchAdapter<GetMyRewardsPageResponse>(adapters.get_my_rewards).setTag(tags.my_rewards());

  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }
  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
