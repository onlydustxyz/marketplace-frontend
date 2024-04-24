import { useQueryClient } from "@tanstack/react-query";
import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { hackathonsApiClient } from "api-client/resources/hackathons";
import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";
import { UpdateHackathonsRegistrationsParams } from "api-client/resources/me/types";

import adapters from "../adapters";

export function updateHackathonsRegistrations({
  hackathonId,
  hackathonSlug,
}: UpdateHackathonsRegistrationsParams): IFetchAdapater<unknown> {
  return new FetchAdapter<GetHackathonDetailsReponse>(adapters.hackathonRegistrations)
    .setPathParams({ hackathonId })
    .setSuccessCallback(() => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: [hackathonsApiClient.tags.by_slug(hackathonSlug)], exact: false });
    });
}
