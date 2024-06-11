import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/users/tags";
import { UserPublicProfileResponseV2 } from "api-client/resources/users/types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";

export function getUserPublicProfileByGithubId({
  pathParams,
}: ParametersInterface<{
  PathParams: { githubId: number };
}>): IFetchAdapater<UserPublicProfileResponseV2> {
  const fetchAdapter = new FetchAdapter<UserPublicProfileResponseV2>(adapters.public_profile_by_id);

  if (pathParams) {
    fetchAdapter.setPathParams(pathParams).setTag(tags.public_profile_by_id(pathParams.githubId));
  }

  return fetchAdapter;
}
