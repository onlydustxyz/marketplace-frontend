import { BaseQueriesOptions } from "../type.actions";
import { BaseQueries } from "../base-queries.actions";
import { components } from "../../src/__generated/api";
import { ACTION_PATH } from "../path.actions";
import { UsersActionTags } from "./users-tags.actions";

export type UserProfile = components["schemas"]["PublicUserProfileResponse"];

async function retrieveByGithubId(githubId: string, options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<UserProfile>(ACTION_PATH.USER_PROFILE_BY_GITHUB_ID(githubId), {
    provideTag: [UsersActionTags.all, UsersActionTags.details(githubId)],
    ...(options || {}),
  });
}

async function retrieveByGithubLogin(githubLogin: string, options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<UserProfile>(ACTION_PATH.USER_PROFILE_BY_GITHUB_LOGIN(githubLogin), {
    provideTag: [UsersActionTags.all, UsersActionTags.details(githubLogin)],
    ...(options || {}),
  });
}

export default {
  retrieveByGithubId,
  retrieveByGithubLogin,
};
