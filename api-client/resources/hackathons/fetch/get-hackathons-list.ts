import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";

export async function getHackathonsList(): Promise<ListHackathonsResponse> {
  return new FetchAdapter(adapters.root).request<ListHackathonsResponse>();
}
