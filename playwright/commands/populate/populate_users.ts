import { APIRequestContext } from "@playwright/test";
import { zip } from "lodash";
import { users } from "../../fixtures/users";
import { UserFixture } from "../../types";
import {
  UpdateProfileDocument,
  UpdateProfileInfoMutation,
  UpdateProfileInfoMutationVariables,
} from "../../__generated/graphql";
import { mutateAsAdmin } from "../common";
import { createGithubUser, signinUser } from "../user";

export const populateUsers = async (request: APIRequestContext): Promise<Record<string, UserFixture>> => {
  const populatedUsers = await Promise.all(Object.values(users).map(user => populateUser(request, user)));
  return Object.fromEntries(zip(Object.keys(users), populatedUsers));
};

const populateUser = async (request: APIRequestContext, user: UserFixture) => {
  const credentials = await createGithubUser(request, user.github.id, user.email, user.github.login);
  const session = await signinUser(request, credentials);

  if (user.profile) {
    await mutateAsAdmin<UpdateProfileInfoMutation, UpdateProfileInfoMutationVariables>({
      mutation: UpdateProfileDocument,
      variables: user.profile,
    });
  }

  return {
    id: credentials.userId,
    password: credentials.password,
    token: JSON.stringify(session),
    ...user,
  };
};
