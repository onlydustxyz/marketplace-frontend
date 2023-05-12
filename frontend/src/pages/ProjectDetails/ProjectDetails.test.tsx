import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

import { generatePath, Route, Routes } from "react-router-dom";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectDetails from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY } from "src/types";
import Overview from "src/pages/ProjectDetails/Overview";
import { GetProjectDocument, GetProjectQueryResult, GetProjectsForSidebarDocument } from "src/__generated/graphql";
import { merge } from "lodash";

const TEST_LED_PROJECT_ID = "test-led-project-id";
const TEST_PROJECT_ID = "test-project-id";
const TEST_PROJECT_NAME = "test-project-name";
const TEST_LED_PROJECT_NAME = "test-led-project-name";
const TEST_TELEGRAM_LINK = "test-link";
const TEST_DESCRIPTION = "test-description";
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

const TEST_GITHUB_USER_ID = 123456;

vi.mock("jwt-decode", () => ({
  default: () => {
    return {
      [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_LED_PROJECT_ID}"}`, [GITHUB_USERID_KEY]: TEST_GITHUB_USER_ID },
    };
  },
}));

const getProjectMock = {
  request: {
    query: GetProjectDocument,
    variables: {
      id: TEST_PROJECT_ID,
    },
  },
  result: {
    data: {
      projectsByPk: {
        __typename: "Projects",
        id: TEST_PROJECT_ID,
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
              initialAmount: 1000,
            },
          },
        },
        projectDetails: {
          projectId: TEST_PROJECT_ID,
          name: TEST_PROJECT_NAME,
          telegramLink: TEST_TELEGRAM_LINK,
          shortDescription: TEST_DESCRIPTION,
          logoUrl: null,
        },
        pendingInvitations: [{ id: "test-invitation-id", githubUserId: TEST_GITHUB_USER_ID }],
        projectLeads: [
          {
            userId: "test-user-id",
            projectId: TEST_PROJECT_ID,
            user: {
              id: "test-user-id",
              displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
              avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
            },
          },
        ],
        budgets: [{ id: "budget-1", paymentRequests: [] }],
        githubRepos: [{ githubRepoId: 123456, projectId: TEST_PROJECT_ID, repo: null, repoContributors: [] }],
        projectSponsors: [],
      },
    } as GetProjectQueryResult["data"],
  },
};

const getLedProjectMock = {
  request: {
    query: GetProjectDocument,
    variables: {
      id: TEST_LED_PROJECT_ID,
    },
  },
  result: {
    data: {
      projectsByPk: {
        __typename: "Projects",
        id: TEST_LED_PROJECT_ID,
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
              initialAmount: 1000,
            },
          },
        },
        projectDetails: {
          projectId: TEST_LED_PROJECT_ID,
          name: TEST_LED_PROJECT_NAME,
          telegramLink: TEST_TELEGRAM_LINK,
          shortDescription: TEST_DESCRIPTION,
          logoUrl: null,
        },
        pendingInvitations: [],
        projectLeads: [
          {
            userId: "test-user-id",
            projectId: TEST_LED_PROJECT_ID,
            user: {
              id: "test-user-id",
              displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
              avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
            },
          },
        ],
        budgets: [{ id: "budget-1", paymentRequests: [] }],
        githubRepos: [{ projectId: TEST_LED_PROJECT_ID, githubRepoId: 123456, repo: null, repoContributors: [] }],
        projectSponsors: [],
      },
    } as GetProjectQueryResult["data"],
  },
};

const getProjectForSidebarMock = {
  request: { query: GetProjectsForSidebarDocument },
  result: {
    data: {
      projects: [
        {
          id: TEST_PROJECT_ID,
          projectDetails: {
            name: TEST_PROJECT_NAME,
            logoUrl: "test-logo-url",
          },
          pendingInvitations: [{ id: "test-invitation-id", githhubUserId: TEST_GITHUB_USER_ID }],
        },
        {
          id: TEST_LED_PROJECT_ID,
          projectDetails: { name: TEST_LED_PROJECT_NAME, logoUrl: "test-logo-url" },
        },
      ],
    },
  },
};

const graphQlMocks = [getProjectMock, getLedProjectMock, getProjectForSidebarMock];

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
        <Route path="/projects/:projectId" element={<ProjectDetails />}>
          <Route index element={<Overview />} />
        </Route>
      </Routes>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: generatePath(RoutePaths.ProjectDetails, { projectId: TEST_PROJECT_ID }),
          mocks: graphQlMocks,
        }),
      }
    );
    await screen.findByText("You've been promoted to Project Lead on test-project-name");
  });

  it("should store the project id if it is a project led by the user", async () => {
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

  it("should redirect to homepage if project is not visible", async () => {
    renderWithIntl(
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectDetails />}></Route>
      </Routes>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: generatePath(RoutePaths.ProjectDetails, { projectId: TEST_LED_PROJECT_ID }),
          mocks: [merge(getProjectMock, { result: { data: { projectsByPk: { githubRepos: [] } } } })],
        }),
      }
    );

    await waitFor(() => expect(window.location.pathname).toBe("/"));
  });
});
