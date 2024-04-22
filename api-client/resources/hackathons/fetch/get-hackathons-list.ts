import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

import definitions from "../definitions";

export async function getHackathonsList(): Promise<ListHackathonsResponse> {
  return definitions.root().get<ListHackathonsResponse>();
}
