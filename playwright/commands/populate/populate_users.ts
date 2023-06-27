import { APIRequestContext } from "@playwright/test";
import { zip } from "lodash";
import { users } from "../../fixtures/data/users";
import { User, UserFixture } from "../../types";
import {
  MarkOnboardingAsCompletedDocument,
  MarkOnboardingAsCompletedMutation,
  MarkOnboardingAsCompletedMutationVariables,
  UpdatePayoutInfoDocument,
  UpdatePayoutInfoMutation,
  UpdatePayoutInfoMutationVariables,
} from "../../__generated/graphql";
import { mutateAsRegisteredUser } from "../common";
import { createGithubUser, signinUser } from "../user";

export const populateUsers = async (request: APIRequestContext): Promise<Record<string, User>> => {
  const populatedUsers = await Promise.all(Object.values(users).map(user => populateUser(request, user)));
  return Object.fromEntries(zip(Object.keys(users), populatedUsers));
};

const populateUser = async (request: APIRequestContext, user: UserFixture) => {
  const credentials = await createGithubUser(request, user.github.id, user.github.login, user.email);
  const session = await signinUser(request, credentials);

  if (user.payoutInfo && user.payoutInfo.populate !== false) {
    await mutateAsRegisteredUser<UpdatePayoutInfoMutation, UpdatePayoutInfoMutationVariables>(session.accessToken, {
      mutation: UpdatePayoutInfoDocument,
      variables: user.payoutInfo,
    });
  }

  if (user.onboardingWizardCompleted) {
    await mutateAsRegisteredUser<MarkOnboardingAsCompletedMutation, MarkOnboardingAsCompletedMutationVariables>(
      session.accessToken,
      {
        mutation: MarkOnboardingAsCompletedDocument,
      }
    );
  }

  return {
    id: credentials.userId,
    password: credentials.password,
    token: session.accessToken,
    session: JSON.stringify(session),
    ...user,
  };
};
