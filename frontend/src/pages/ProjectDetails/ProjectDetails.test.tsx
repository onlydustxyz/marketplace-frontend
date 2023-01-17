import { describe, expect, it, Mock, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

import { generatePath, Route, Routes } from "react-router-dom";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectDetails, { GET_PROJECT_QUERY } from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import jwtDecode from "jwt-decode";
import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { GET_PROJECTS_FOR_SIDEBAR_QUERY } from "./Sidebar";
import { PENDING_PROJECT_LEADER_INVITATIONS_QUERY } from "src/graphql/queries";

const TEST_LED_PROJECT_ID = "test-led-project-id";
const TEST_PROJECT_ID = "test-project-id";
const TEST_PROJECT_NAME = "test-project-name";
const TEST_LED_PROJECT_NAME = "test-led-project-name";
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

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: TEST_ACCESS_TOKEN,
    }),
  },
}));

vi.mock("jwt-decode");

const graphQlMocks = [
  {
    request: {
      query: GET_PROJECT_QUERY,
      variables: {
        id: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          id: TEST_PROJECT_ID,
          name: TEST_PROJECT_NAME,
          totalSpentAmountInUsd: 1000,
          projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION, logoUrl: null },
          pendingInvitations: [{ id: "test-invitation-id" }],
          projectLeads: [
            {
              userId: "test-user-id",
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
              readme: null,
              contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN, avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL }],
              logoUrl: null,
            },
            languages: {},
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_PROJECT_QUERY,
      variables: {
        id: TEST_LED_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          id: TEST_LED_PROJECT_ID,
          name: TEST_LED_PROJECT_NAME,
          totalSpentAmountInUsd: 1000,
          projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION, logoUrl: null },
          pendingInvitations: [],
          projectLeads: [
            {
              userId: "test-user-id",
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
              readme: null,
              contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN, avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL }],
              logoUrl: TEST_PROJECT_LEAD_AVATAR_URL,
            },
            languages: {},
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
            pendingInvitations: [{ id: "test-invitation-id" }],
            githubRepo: {
              logoUrl: "test-github-logo-url",
              content: {
                contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
                logoUrl: null,
              },
            },
          },
          {
            id: TEST_LED_PROJECT_ID,
            name: TEST_LED_PROJECT_NAME,
            projectDetails: { logoUrl: "test-logo-url" },
            githubRepo: {
              logoUrl: "test-github-logo-url",
              content: {
                contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
                logoUrl: null,
              },
            },
          },
        ],
      },
    },
  },
];

describe('"ProjectDetails" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(TEST_ACCESS_TOKEN));
  });

  beforeEach(() => {
    window.localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    vi.resetAllMocks();
  });

  it("should show a pending invitation if the user has been invited", async () => {
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

  it("should store the project id if it is a project led by the user", async () => {
    const jwt = {
      [CLAIMS_KEY]: {
        [PROJECTS_LED_KEY]: `{"${TEST_LED_PROJECT_ID}"}`,
      },
    };
    (jwtDecode as Mock).mockReturnValue(jwt);

    renderWithIntl(
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectDetails />}></Route>
      </Routes>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: generatePath(RoutePaths.ProjectDetails, { projectId: TEST_LED_PROJECT_ID }),
          mocks: graphQlMocks,
        }),
      }
    );
    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || "{}").lastVisitedProjectId).toBe(
        TEST_LED_PROJECT_ID
      );
    });
  });

  it("should store the project id if the user has been invited as project lead", async () => {
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

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || "{}").lastVisitedProjectId).toBe(
        TEST_PROJECT_ID
      );
    });
  });

  it("should not store the project id if not project led nor invited", async () => {
    renderWithIntl(
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectDetails />}></Route>
      </Routes>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: generatePath(RoutePaths.ProjectDetails, { projectId: TEST_LED_PROJECT_ID }),
          mocks: graphQlMocks,
        }),
      }
    );

    expect(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || "{}").lastVisitedProjectId
    ).toBeUndefined();
  });
});
