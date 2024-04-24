import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";
import { UpdateHackathonsRegistrationsParams } from "api-client/resources/me/types";

import adapters from "../adapters";

export function updateHackathonsRegistrations({
  hackathonId,
}: UpdateHackathonsRegistrationsParams): IFetchAdapater<unknown> {
  return new FetchAdapter<GetHackathonDetailsReponse>(adapters.hackathonRegistrations).setPathParams({ hackathonId });
}
