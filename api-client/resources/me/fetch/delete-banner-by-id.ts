import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { CloseBannerPathParams } from "api-client/resources/me/types";

import adapters from "../adapters";

export function deleteBannerById({ bannerId }: CloseBannerPathParams): IFetchAdapater<unknown> {
  return new FetchAdapter<never>(adapters.delete_banner_by_id).setPathParams({ bannerId });
}
