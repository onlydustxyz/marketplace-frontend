import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/users/tags";
import { UserPublicProfileResponse } from "api-client/resources/users/types";

import adapters from "../adapters";

export function getUserPublicProfileByGithubLogin(githubLogin: string): IFetchAdapater<UserPublicProfileResponse> {
  return new FetchAdapter<UserPublicProfileResponse>(adapters.public_profile_by_login)
    .setPathParams({ githubLogin })
    .setTag(tags.public_profile_by_login(githubLogin));
}
