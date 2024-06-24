import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { GetApplicationResponse } from "../types";

export function getApplicationById(id: string): IFetchAdapater<GetApplicationResponse> {
  return new FetchAdapter<GetApplicationResponse>(adapters.get_by_id).setPathParams({ id }).setTag(tags.by_id(id));
}
