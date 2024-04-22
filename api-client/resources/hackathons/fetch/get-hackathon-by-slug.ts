import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";

import definitions from "../definitions";

export async function getHackathonBySlug(slug: string): Promise<GetHackathonDetailsReponse> {
  return definitions.by_slug(slug).get<GetHackathonDetailsReponse>();
}
