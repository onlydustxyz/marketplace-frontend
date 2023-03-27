import { APIRequestContext } from "@playwright/test";
import { zip } from "lodash";
import { User } from "../../types";
import { signinUser } from "../user";

export const signinUsers = async (
  request: APIRequestContext,
  users: Record<string, User>
): Promise<Record<string, User>> => {
  const signedUsers = await Promise.all(Object.values(users).map(user => signinSingleUser(request, user)));
  return Object.fromEntries(zip(Object.keys(users), signedUsers));
};

const signinSingleUser = async (request: APIRequestContext, user: User) => {
  const session = await signinUser(request, user);

  return {
    ...user,
    token: session.accessToken,
    session: JSON.stringify(session),
  };
};
