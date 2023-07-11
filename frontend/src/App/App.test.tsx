import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

import App, { RoutePaths } from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import {
  GetGithubRepositoryDetailsDocument,
  GetGithubRepositoryDetailsQueryResult,
  GetProjectOverviewDetailsDocument,
  GetProjectOverviewDetailsQueryResult,
  GetProjectsDocument,
  GetProjectsForSidebarDocument,
  GetProjectsForSidebarQueryResult,
  GetProjectsQueryResult,
} from "src/__generated/graphql";
import { buildQuerySorting } from "src/pages/Projects/AllProjects";
import { Sorting } from "src/pages/Projects/sorting";

const TEST_USER_ID = "test-user-id";
const TEST_GITHUB_USER_ID = 123456789;
const PROFILE_BUTTON_TEST_ID = "profile-button";
const LOGOUT_BUTTON_TEST_ID = "logout-button";

const TEST_PROJECT_ID = "test-project-id";
const TEST_PROJECT_NAME = "test-project-name";
const TEST_TELEGRAM_LINK = "test-link";
const TEST_DESCRIPTION = "test-description";
const TEST_GITHUB_REPO_ID = 123456;
const TEST_GITHUB_REPO_NAME = "test-github-repo-name";
const TEST_GITHUB_REPO_OWNER = "test-github-repo-owner";
const TEST_GITHUB_REPO_CONTENT = "test-github-repo-content";
const TEST_GITHUB_CONTRIBUTOR_LOGIN = "test-github-contributor-login";
const TEST_PROJECT_LEAD_DISPLAY_NAME = "test-project-lead-display-name";
const TEST_PROJECT_LEAD_AVATAR_URL = "http://foo.bar/plop.png";

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

const ALL_PROJECTS_RESULT: { data: GetProjectsQueryResult["data"] } = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: TEST_PROJECT_ID,
        contributors: [],
        contributorsAggregate: { aggregate: { count: 0 } },
        githubReposAggregate: { aggregate: { count: 1 } },
        projectDetails: {
          __typename: "ProjectDetails",
          projectId: TEST_PROJECT_ID,
          name: TEST_PROJECT_NAME,
          telegramLink: TEST_TELEGRAM_LINK,
          shortDescription: TEST_DESCRIPTION,
          logoUrl: null,
          hiring: false,
          rank: 0,
          visibility: "public",
        },
        projectLeads: [
          {
            __typename: "ProjectLeads",
            userId: TEST_USER_ID,
            projectId: TEST_PROJECT_ID,
            user: {
              __typename: "RegisteredUsers",
              id: TEST_USER_ID,
              login: TEST_PROJECT_LEAD_DISPLAY_NAME,
              avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
              githubUserId: 12345,
            },
          },
        ],
        pendingInvitations: [],
        githubRepos: [
          {
            __typename: "ProjectGithubRepos",
            projectId: TEST_PROJECT_ID,
            githubRepoId: TEST_GITHUB_REPO_ID,
            repo: null,
          },
        ],
        projectSponsors: [],
        budgetsAggregate: { aggregate: { count: 1, sum: { spentAmount: 100, initialAmount: 1000 } } },
      },
    ],
  },
};

const GITHUB_REPO_DETAILS_RESULT: { data: GetGithubRepositoryDetailsQueryResult["data"] } = {
  data: {
    githubReposByPk: {
      __typename: "GithubRepos",
      id: TEST_GITHUB_REPO_ID,
      owner: TEST_GITHUB_REPO_OWNER,
      name: TEST_GITHUB_REPO_NAME,
      description: TEST_GITHUB_REPO_CONTENT,
      htmlUrl: "url",
      stars: 0,
      forkCount: 0,
      languages: {
        __typename: "GithubRepoDetails",
        id: TEST_GITHUB_REPO_ID,
        languages: {},
      },
    },
  },
};

const PROJECT_OVERVIEW_DETAILS_RESULT: { data: GetProjectOverviewDetailsQueryResult["data"] } = {
  data: {
    projectsByPk: {
      __typename: "Projects",
      id: TEST_PROJECT_ID,
      projectDetails: {
        projectId: TEST_PROJECT_ID,
        name: TEST_PROJECT_NAME,
        logoUrl: null,
        longDescription: "This is the long description",
        telegramLink: TEST_TELEGRAM_LINK,
        hiring: false,
        visibility: "public",
      },
      pendingInvitations: [],
      budgetsAggregate: { aggregate: { sum: { initialAmount: 0, spentAmount: 0 } } },
      contributors: [
        {
          githubUser: { login: TEST_GITHUB_CONTRIBUTOR_LOGIN, avatarUrl: "avatarUrl", htmlUrl: "", id: 1, user: null },
        },
      ],
      contributorsAggregate: { aggregate: { count: 1 } },
      projectLeads: [],
      projectSponsors: [],
      githubRepos: [
        {
          repo: { id: TEST_GITHUB_REPO_ID, stars: 1000, languages: {} },
        },
      ],
    },
  },
};

const graphQlMocks = [
  {
    request: {
      query: GetProjectsDocument,
      variables: {
        where: {},
        orderBy: buildQuerySorting(Sorting.Trending),
      },
    },
    result: ALL_PROJECTS_RESULT,
  },
  {
    request: {
      query: GetProjectsDocument,
      variables: {
        where: {},
        orderBy: buildQuerySorting(Sorting.Trending),
      },
    },
    result: ALL_PROJECTS_RESULT,
  },
  {
    request: {
      query: GetProjectsForSidebarDocument,
    },
    result: {
      data: {
        projects: [
          {
            __typename: "Projects",
            id: TEST_PROJECT_ID,
            projectDetails: {
              projectId: TEST_PROJECT_ID,
              name: TEST_PROJECT_NAME,
              logoUrl: null,
              visibility: "public",
            },
            pendingInvitations: [],
            projectLeads: [],
            contributorsAggregate: { aggregate: { count: 0 } },
            githubReposAggregate: { aggregate: { count: 1 } },
            budgetsAggregate: { aggregate: { count: 1 } },
            contributors: [],
          },
        ],
      } as GetProjectsForSidebarQueryResult["data"],
    },
  },
  {
    request: {
      query: GetProjectOverviewDetailsDocument,
      variables: { projectId: TEST_PROJECT_ID },
    },
    result: PROJECT_OVERVIEW_DETAILS_RESULT,
  },
  {
    request: {
      query: GetGithubRepositoryDetailsDocument,
      variables: { githubRepoId: TEST_GITHUB_REPO_ID },
    },
    result: GITHUB_REPO_DETAILS_RESULT,
  },
];

Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 2000 });
class ResizeObserver {
  observe() {
    return;
  }
  unobserve() {
    return;
  }
  disconnect() {
    return;
  }
}

describe("Integration tests", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.ResizeObserver = ResizeObserver;
  });

  it.skip("should be able to access the project details page from the projects list and see the tabs", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Projects}`,
        mocks: graphQlMocks,
      }),
    });
    userEvent.click((await screen.findAllByText(TEST_PROJECT_NAME))[0]);
    await waitFor(() => {
      screen.getByText(TEST_PROJECT_LEAD_DISPLAY_NAME);
      screen.getByText(TEST_GITHUB_REPO_CONTENT);
    });

    screen.getByText(/project lead/i);
    screen.getByText(/granted/i);
    screen.getByText("Overview");
    expect(screen.queryByText("Payments")).not.toBeInTheDocument();
    screen.getByText("Contributors");
  });

  it("should redirect to project list when logging out", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Projects}`,
        mocks: graphQlMocks,
      }),
    });
    userEvent.click(await screen.findByTestId(PROFILE_BUTTON_TEST_ID));
    userEvent.click(await screen.findByTestId(LOGOUT_BUTTON_TEST_ID));
    await screen.findByText("Projects");
    expect(window.location.pathname).toBe(RoutePaths.Projects);
  });
});
