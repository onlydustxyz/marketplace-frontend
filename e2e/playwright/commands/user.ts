import { APIRequestContext } from "@playwright/test";
import { getEnv, mutateAsAdmin, queryAsAdmin } from "./common";
import { expect } from "@playwright/test";
import {
  CreateGithubAuthUserDocument,
  CreateGithubAuthUserMutation,
  CreateGithubAuthUserMutationVariables,
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  SetUserEmailVerifiedDocument,
  SetUserEmailVerifiedMutation,
  SetUserEmailVerifiedMutationVariables,
} from "../__generated/graphql";

export const signinUser = async (request: APIRequestContext, credentials: { email: string; password: string }) => {
  const response = await request.post("http://localhost:4000/signin/email-password", {
    data: {
      email: credentials.email,
      password: credentials.password,
    },
    failOnStatusCode: true,
  });
  const body = await response.json();
  return body.session;
};

export const createGithubUser = async (
  request: APIRequestContext,
  githubUserId: number,
  displayName: string,
  email = `e2e-${Date.now()}@onlydust.xyz`
) => {
  const password = "Str0ngPassw#ord-94|%";

  await request.post("http://localhost:4000/signup/email-password", {
    data: {
      email: email,
      options: {
        allowedRoles: ["me", "public", "registered_user"],
        defaultRole: "registered_user",
        displayName: displayName,
        locale: "en",
      },
      password: password,
    },
    failOnStatusCode: false,
  });

  const userByEmail = await queryAsAdmin<GetUserByEmailQuery, GetUserByEmailQueryVariables>({
    query: GetUserByEmailDocument,
    variables: { email },
  });
  const userId: string = userByEmail.data.users[0].id;
  expect(userId).toBeTruthy();

  await mutateAsAdmin<SetUserEmailVerifiedMutation, SetUserEmailVerifiedMutationVariables>({
    mutation: SetUserEmailVerifiedDocument,
    variables: { userId },
  });

  await mutateAsAdmin<CreateGithubAuthUserMutation, CreateGithubAuthUserMutationVariables>({
    mutation: CreateGithubAuthUserDocument,
    variables: {
      userId,
      githubUserId: githubUserId.toString(),
      accessToken: getEnv("GITHUB_PAT_FOR_E2E_TESTS_USERS"),
    },
  });

  return { userId, email, password };
};
