import { describe, expect, it, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import { Route, Routes } from "react-router-dom";

import Login, { AUTH_CODE_QUERY_KEY } from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import { generatePath } from "react-router-dom";
import {
  GetPaymentRequestsDocument,
  GetPaymentRequestsQueryResult,
  GetUserPayoutSettingsDocument,
  GetUserPayoutSettingsQueryResult,
  PendingProjectLeaderInvitationsDocument,
  PendingProjectLeaderInvitationsQueryResult,
  PendingUserPaymentsDocument,
  PendingUserPaymentsQueryResult,
  UserPayoutSettingsFragment,
  WorkItemType,
} from "src/__generated/graphql";
import { RoutePaths } from "src/App";
import { MockedResponse } from "@apollo/client/testing";
import { screen } from "@testing-library/react";

const AUTH_CODE_TEST_VALUE = "code";
const TEST_USER_ID = "test-user-id";
const TEST_GITHUB_USER_ID = 123456789;
const TEST_PROJECT_ID = "test-project-id";

expect.extend(matchers);

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "TEST_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

const HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "VALID_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
  refreshToken: "test-refresh-token",
};

vi.mock("axios", () => ({
  default: {
    post: (url: string, tokenSet?: TokenSet) => ({
      data: tokenSet?.refreshToken ? HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE : HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

vi.mock("jwt-decode", () => ({
  default: (jwt: string) => {
    if (jwt === "VALID_ACCESS_TOKEN") {
      return {
        [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_PROJECT_ID}"}`, [GITHUB_USERID_KEY]: TEST_GITHUB_USER_ID },
      };
    } else throw "Error";
  },
}));

const pendingProjectLeadInvitationMock = {
  request: {
    query: PendingProjectLeaderInvitationsDocument,
    variables: { githubUserId: TEST_GITHUB_USER_ID },
  },
  result: {
    data: {
      pendingProjectLeaderInvitations: [
        {
          id: "invitation-id",
          project: {
            id: TEST_PROJECT_ID,
            key: TEST_PROJECT_ID,
          },
        },
      ],
    } as PendingProjectLeaderInvitationsQueryResult["data"],
  },
};

const pendingPaymentsMock = {
  request: {
    query: PendingUserPaymentsDocument,
    variables: { userId: TEST_USER_ID },
  },
  result: {
    data: {
      registeredUsers: [
        {
          __typename: "RegisteredUsers",
          id: TEST_USER_ID,
          githubUserId: TEST_GITHUB_USER_ID,
          paymentRequests: [
            {
              __typename: "PaymentRequests",
              id: "payment-1",
              amountInUsd: 100,
              paymentsAggregate: { aggregate: { sum: { amount: null } } },
            },
          ],
        },
      ],
    } as PendingUserPaymentsQueryResult["data"],
  },
};

const paymentRequestsMock = {
  request: {
    query: GetPaymentRequestsDocument,
    variables: {
      githubUserId: TEST_GITHUB_USER_ID,
    },
  },
  result: {
    data: {
      paymentRequests: [
        {
          __typename: "PaymentRequests",
          id: "705e6b37-d0ee-4e87-b681-7009dd691965",
          requestedAt: "2023-01-10T19:10:27.802657",
          payments: [
            {
              __typename: "Payments",
              amount: 100,
              currencyCode: "USD",
            },
            {
              __typename: "Payments",
              amount: 100,
              currencyCode: "USD",
            },
          ],
          amountInUsd: 200,
          workItems: [
            {
              __typename: "WorkItems",
              id: "705e6b37-d0ee-4e87-b681-7009dd691965",
              type: WorkItemType.Issue,
              githubIssue: null,
              githubPullRequest: null,
            },
          ],
          invoiceReceivedAt: null,
          project: {
            __typename: "Projects",
            id: "632d5da7-e590-4815-85ea-82a5585e6049",
            shortDescription: "SOOOOOO awesome",
            logoUrl: null,
            name: "MyAwesomeProject",
          },
        },
      ],
    } as GetPaymentRequestsQueryResult["data"],
  },
};

const payoutSettingsMock = {
  request: {
    query: GetUserPayoutSettingsDocument,
    variables: { githubUserId: TEST_GITHUB_USER_ID },
  },
  result: {
    data: {
      registeredUsers: [
        {
          __typename: "RegisteredUsers",
          id: TEST_USER_ID,
          userPayoutInfo: {
            __typename: "UserPayoutInfo",
            userId: TEST_USER_ID,
          } as UserPayoutSettingsFragment,
        },
      ],
    } as GetUserPayoutSettingsQueryResult["data"],
  },
};

const renderWithRoutes = (route: string, mocks?: MockedResponse[]) =>
  renderWithIntl(
    <Routes>
      <Route path={RoutePaths.Login} element={<Login />} />
      <Route path={RoutePaths.Projects} element={<div>Projects</div>} />
      <Route path={RoutePaths.Rewards} element={<div>Rewards</div>} />
      <Route path={RoutePaths.ProjectDetails} element={<div>ProjectDetails</div>} />
    </Routes>,
    {
      wrapper: MemoryRouterProviderFactory({
        route,
        mocks,
      }),
    }
  );

describe("Login page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should log in and go to projects page if a refresh token is passed as a query parameter in the URL", async () => {
    renderWithRoutes(`${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`);
    await screen.findByText("Projects");
  });

  it("should redirect to homepage if no refresh token is passed as a query parameter in the URL", async () => {
    renderWithRoutes(RoutePaths.Login);
    await screen.findByText("Projects");
  });

  it("should redirect to project details with pending invitation at first sign-in", async () => {
    renderWithRoutes(`${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`, [
      pendingProjectLeadInvitationMock,
    ]);
    await screen.findByText("ProjectDetails");
  });

  it("should redirect to rewards page if pending payments and missing payout info at first sign-in", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithRoutes(`${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`, [
      pendingPaymentsMock,
      paymentRequestsMock,
      payoutSettingsMock,
    ]);
    await screen.findByText("Rewards");
  });

  it("should redirect to last visited page if not first sign-in", async () => {
    window.localStorage.setItem(
      LOCAL_STORAGE_SESSION_KEY,
      JSON.stringify({
        lastLoginTime: "132456",
        visitedPageBeforeLogin: generatePath(RoutePaths.ProjectDetails, { projectKey: TEST_PROJECT_ID }),
      })
    );

    renderWithRoutes(`${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`);
    await screen.findByText("ProjectDetails");
  });
});
