import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";

export async function getHackathonBySlug(slug: string): Promise<GetHackathonDetailsReponse> {
  return adapters.by_slug().setPathParams({ slug }).request<GetHackathonDetailsReponse>();
}
