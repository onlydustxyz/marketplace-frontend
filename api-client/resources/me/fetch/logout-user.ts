import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";

export function logoutUser(): IFetchAdapater<unknown> {
  return new FetchAdapter<never>(adapters.logout_user);
}
