import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";

export async function getHackathonsList(): Promise<ListHackathonsResponse> {
  return adapters.root().request<ListHackathonsResponse>();
}
