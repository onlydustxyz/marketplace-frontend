import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetBannerQueryParams, GetBannerResponse } from "../types";

export function getBanner({
  queryParams,
}: ParametersInterface<{
  QueryParams: GetBannerQueryParams;
}>): IFetchAdapater<GetBannerResponse> {
  const fetchAdapter = new FetchAdapter<GetBannerResponse>(adapters.get_banner).setTag(tags.get_banner);
  if (queryParams) {
    fetchAdapter.setParams(queryParams);
  }

  return fetchAdapter;
}
