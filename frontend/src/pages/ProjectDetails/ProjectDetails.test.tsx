import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

import { generatePath, Route, Routes } from "react-router-dom";
import { RoutePaths } from "src/App";
import { PENDING_PROJECT_LEADER_INVITATIONS_QUERY } from "src/graphql/queries";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectDetails, { GET_PROJECTS_FOR_SIDEBAR_QUERY, GET_PROJECT_USER_QUERY } from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";

const TEST_PROJECT_ID = "test-project-id";
const TEST_PROJECT_NAME = "test-project-name";
const TEST_TELEGRAM_LINK = "test-link";
const TEST_DESCRIPTION = "test-description";
const TEST_GITHUB_REPO_NAME = "test-github-repo-name";
const TEST_GITHUB_REPO_OWNER = "test-github-repo-owner";
const TEST_GITHUB_CONTRIBUTOR_LOGIN = "test-github-contributor-login";
const TEST_PROJECT_LEAD_DISPLAY_NAME = "test-project-lead-display-name";
const TEST_PROJECT_LEAD_AVATAR_URL = "http://foo.bar/plop.png";

const TEST_ACCESS_TOKEN = {
  user: {
    id: "test-user-id",
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

const graphQlMocks = [
  {
    request: {
      query: GET_PROJECT_USER_QUERY,
      variables: {
        id: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          name: TEST_PROJECT_NAME,
          budgets: {
            id: "test-budget-id",
            initialAmount: 10000,
            remainingAmount: 9000,
          },
          projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION },
          projectLeads: [
            {
              user: {
                displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
                avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
              },
            },
          ],
          githubRepo: {
            name: TEST_GITHUB_REPO_NAME,
            owner: TEST_GITHUB_REPO_OWNER,
            content: {
              contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
            },
          },
        },
      },
    },
  },
  {
    request: { query: GET_PROJECTS_FOR_SIDEBAR_QUERY },
    result: {
      data: {
        projects: [
          {
            id: TEST_PROJECT_ID,
            name: TEST_PROJECT_NAME,
            projectDetails: { logoUrl: "test-logo-url" },
            githubRepo: {
              logoUrl: "test-github-logo-url",
              content: {
                contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
              },
            },
          },
        ],
      },
    },
  },
  {
    request: { query: PENDING_PROJECT_LEADER_INVITATIONS_QUERY },
    result: {
      data: {
        pendingProjectLeaderInvitations: [
          {
            projectId: TEST_PROJECT_ID,
          },
        ],
      },
    },
  },
];

describe('"Login" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(TEST_ACCESS_TOKEN));
  });

  it("should show a pending invitation", async () => {
    renderWithIntl(
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectDetails />}></Route>
      </Routes>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: generatePath(RoutePaths.ProjectDetails, { projectId: TEST_PROJECT_ID }),
          mocks: graphQlMocks,
        }),
      }
    );
    await screen.findByText("You’ve been promoted to Project Lead on test-project-name");
  });
});
