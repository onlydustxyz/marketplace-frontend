import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";

export function getHackathonsList(): IFetchAdapater<ListHackathonsResponse> {
  return new FetchAdapter<ListHackathonsResponse>(adapters.root);
}
