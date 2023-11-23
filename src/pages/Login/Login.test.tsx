import matchers from "@testing-library/jest-dom/matchers";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { MockedResponse } from "@apollo/client/testing";
import { screen } from "@testing-library/react";
import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";

import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import Login, { AUTH_CODE_QUERY_KEY } from ".";

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
