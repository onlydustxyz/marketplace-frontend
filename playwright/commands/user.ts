import { gql } from "@apollo/client/core";
import { APIRequestContext } from "@playwright/test";
import { getEnv, mutateAsAdmin, queryAsAdmin } from "./common";
import { expect } from "@playwright/test";
import {
  CreateGithubAuthUserMutation,
  CreateGithubAuthUserMutationVariables,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
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
    query: GET_USER_BY_EMAIL,
    variables: { email },
  });
  const userId: string = userByEmail.data.users[0].id;
  expect(userId).toBeTruthy();

  await mutateAsAdmin<SetUserEmailVerifiedMutation, SetUserEmailVerifiedMutationVariables>({
    mutation: SET_USER_EMAIL_VERIFIED,
    variables: { userId },
  });

  await mutateAsAdmin<CreateGithubAuthUserMutation, CreateGithubAuthUserMutationVariables>({
    mutation: CREATE_GITHUB_AUTH_USER,
    variables: {
      userId,
      githubUserId: githubUserId.toString(),
      accessToken: getEnv("GITHUB_PAT_FOR_E2E_TESTS_USERS"),
    },
  });
};

const GET_USER_BY_EMAIL = gql(`
query getUserByEmail($email: citext!) {
    users(where: {email: {_eq: $email}}) {
        id
    }
}
`);

const SET_USER_EMAIL_VERIFIED = gql(`
mutation setUserEmailVerified($userId: uuid!) {
    updateUser(pk_columns: {id: $userId}, _set: {emailVerified: true}) {
        id
    }
}
`);

const CREATE_GITHUB_AUTH_USER = gql(`
mutation createGithubAuthUser($userId: uuid!, $githubUserId: String!, $accessToken: String!) {
    insertAuthUserProvider( object: {userId: $userId, providerId: "github", providerUserId: $githubUserId, accessToken: $accessToken},
                            onConflict: {constraint: user_providers_provider_id_provider_user_id_key, update_columns: userId}) {
        id
    }
}
`);

export const UPDATE_PROFILE = gql(`
mutation updateProfile($contactInformation: ContactInformation!, $identity: IdentityInput!, $location: Location!, $payoutSettings: PayoutSettingsInput!) {
    updateProfileInfo(contactInformation: $contactInformation, identity: $identity, location: $location, payoutSettings: $payoutSettings)
}
`);
