import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetBannerResponse } from "../types";

export function getBanner(_: ParametersInterface<object>): IFetchAdapater<GetBannerResponse> {
  return new FetchAdapter<GetBannerResponse>(adapters.get_banner).setTag(tags.get_banner);
}
