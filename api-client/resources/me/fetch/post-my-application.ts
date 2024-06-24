import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import { PostProjectApplicationCreateResponse } from "../types";

export function postMyApplication(): IFetchAdapater<unknown> {
  return new FetchAdapter<PostProjectApplicationCreateResponse>(adapters.post_my_application);
}
