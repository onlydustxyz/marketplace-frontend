import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { restoreDB } from "./commands/db/db_utils";
import { queryAsAnonymous, queryAsRegisteredUser } from "./commands/common";
import {
  GetPaymentsDocument,
  GetPaymentsQuery,
  GetPaymentsQueryVariables,
  GetUserDetailsDocument,
  GetUserDetailsQuery,
  GetUserDetailsQueryVariables,
} from "./__generated/graphql";

function isEmptyArray(value: unknown): boolean {
  return Array.isArray(value) && value.length === 0;
}

function isNullOrEmptyArray(value: unknown): boolean {
  return value === null || isEmptyArray(value);
}

function deepCheckContainsOnlyNullOrEmptyArrays(obj: object | null): boolean {
  if (obj === null) {
    return true;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__typename") {
      const value = obj[key];
      if ((typeof value === "object" || Array.isArray(value)) && value !== null) {
        if (!isNullOrEmptyArray(value) && !deepCheckContainsOnlyNullOrEmptyArrays(value)) {
          return false;
        }
      } else if (!isNullOrEmptyArray(value)) {
        return false;
      }
    }
  }
  return true;
}

test.describe("As a logged user, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can't get details about other users'", async ({ users }) => {
    const pirate = users.Anthony;
    const result = await queryAsRegisteredUser<GetUserDetailsQuery, GetUserDetailsQueryVariables>(pirate.token, {
      query: GetUserDetailsDocument,
      variables: {
        userId: users.Olivier.id,
      },
    });

    expect(result.data.registeredUsers).not.toBeNull();
    expect(deepCheckContainsOnlyNullOrEmptyArrays(result.data.registeredUsers)).toBeTruthy();
  });

  test("can't get details about other's payments''", async ({ users }) => {
    const pirate = users.Anthony;
    const result = await queryAsRegisteredUser<GetPaymentsQuery, GetPaymentsQueryVariables>(pirate.token, {
      query: GetPaymentsDocument,
    });

    expect(result.data.paymentRequests).not.toBeNull();
    expect(deepCheckContainsOnlyNullOrEmptyArrays(result.data.paymentRequests)).toBeTruthy();
  });
});

test.describe("As an anonymous user, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can't get details about other users'", async ({ users }) => {
    await expect(
      queryAsAnonymous<GetUserDetailsQuery, GetUserDetailsQueryVariables>({
        query: GetUserDetailsDocument,
        variables: {
          userId: users.Olivier.id,
        },
      })
    ).rejects.toThrow("field 'email' not found in type: 'RegisteredUsers'");
  });

  test("can't get details about other's payments''", async () => {
    await expect(
      queryAsAnonymous<GetPaymentsQuery, GetPaymentsQueryVariables>({
        query: GetPaymentsDocument,
      })
    ).rejects.toThrow("field 'email' not found in type: 'RegisteredUsers'");
  });
});
