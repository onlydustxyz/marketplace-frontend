import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { EcosystemsQueryParams, GetEcosystemProjectPageResponse } from "../types";

export function getAllEcosystems(queryParams: EcosystemsQueryParams): IFetchAdapater<GetEcosystemProjectPageResponse> {
  return new FetchAdapter<GetEcosystemProjectPageResponse>(adapters.get_all)
    .setParams({
      pageIndex: 0,
      pageSize: 50, // no pagination for now in UI
    })
    .setParams(queryParams)
    .setTag(tags.get_all(queryParams));
}
