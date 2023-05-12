import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

import App, { RoutePaths } from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { buildGetProjectsQuery } from "src/pages/Projects/AllProjects";
import {
  GetGithubRepositoryDetailsDocument,
  GetGithubRepositoryDetailsQueryResult,
  GetProjectContributorsForOverviewDocument,
  GetProjectContributorsForOverviewQueryResult,
  GetProjectDocument,
  GetProjectOverviewDetailsDocument,
  GetProjectOverviewDetailsQueryResult,
  GetProjectQueryResult,
  GetProjectsForSidebarDocument,
  GetProjectsForSidebarQueryResult,
  GetProjectsQueryResult,
  ProfileDocument,
  ProfileQueryResult,
} from "src/__generated/graphql";

const TEST_USER_ID = "test-user-id";
const TEST_GITHUB_USER_ID = 123456789;
const TEST_USER_EMAIL = "test@user.email";
const EDIT_PROFILE_TITLE = "Edit profile";
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
        projectDetails: {
          __typename: "ProjectDetails",
          projectId: TEST_PROJECT_ID,
          name: TEST_PROJECT_NAME,
          telegramLink: TEST_TELEGRAM_LINK,
          shortDescription: TEST_DESCRIPTION,
          logoUrl: null,
        },
        projectLeads: [
          {
            __typename: "ProjectLeads",
            userId: TEST_USER_ID,
            projectId: TEST_PROJECT_ID,
            user: {
              __typename: "users",
              id: TEST_USER_ID,
              displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
              avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
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
            repoContributors: [],
          },
        ],
        projectSponsors: [],
        budgetsAggregate: { aggregate: { sum: { spentAmount: 100, initialAmount: 1000 } } },
        budgets: [{ __typename: "Budgets", id: "budget-1", paymentRequests: [] }],
      },
    ],
  },
};

const SINGLE_PROJECT_RESULT: { data: GetProjectQueryResult["data"] } = {
  data: {
    projectsByPk: {
      __typename: "Projects",
      id: TEST_PROJECT_ID,
      budgetsAggregate: {
        aggregate: {
          sum: {
            spentAmount: 123,
            initialAmount: 1000,
          },
        },
      },
      projectDetails: {
        __typename: "ProjectDetails",
        name: TEST_PROJECT_NAME,
        telegramLink: TEST_TELEGRAM_LINK,
        shortDescription: TEST_DESCRIPTION,
        projectId: TEST_PROJECT_ID,
        logoUrl: null,
      },
      projectLeads: [
        {
          __typename: "ProjectLeads",
          projectId: TEST_PROJECT_ID,
          userId: TEST_USER_ID,
          user: {
            __typename: "users",
            id: TEST_USER_ID,
            displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
            avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
          },
        },
      ],
      pendingInvitations: [
        { __typename: "PendingProjectLeaderInvitations", id: "invitation-id", githubUserId: TEST_GITHUB_USER_ID },
      ],
      githubRepos: [
        {
          __typename: "ProjectGithubRepos",
          projectId: TEST_PROJECT_ID,
          githubRepoId: TEST_GITHUB_REPO_ID,
          repoContributors: [],
          repo: {
            __typename: "CrmGithubRepos",
            id: TEST_GITHUB_REPO_ID,
            languages: [],
          },
        },
      ],
      projectSponsors: [],
      budgets: [{ __typename: "Budgets", id: "budget-1", paymentRequests: [] }],
    },
  },
};

const GITHUB_REPO_DETAILS_RESULT: { data: GetGithubRepositoryDetailsQueryResult["data"] } = {
  data: {
    crmGithubReposByPk: {
      __typename: "CrmGithubRepos",
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
      },
      githubRepos: [
        {
          projectId: TEST_PROJECT_ID,
          githubRepoId: TEST_GITHUB_REPO_ID,
          repo: { id: TEST_GITHUB_REPO_ID, stars: 1000 },
        },
      ],
    },
  },
};

const graphQlMocks = [
  {
    request: {
      query: buildGetProjectsQuery([], []),
      variables: { languages: [], sponsors: [] },
    },
    result: ALL_PROJECTS_RESULT,
  },
  {
    request: {
      query: buildGetProjectsQuery([], []),
      variables: { languages: [], sponsors: [] },
    },
    result: ALL_PROJECTS_RESULT,
  },
  {
    request: {
      query: ProfileDocument,
      variables: {
        id: TEST_USER_ID,
      },
    },
    result: {
      data: {
        userInfoByPk: {
          __typename: "UserInfo",
          userId: TEST_USER_ID,
          contactInformation: { email: TEST_USER_EMAIL },
          identity: null,
          location: null,
          payoutSettings: null,
        },
      } as ProfileQueryResult["data"],
    },
  },
  {
    request: {
      query: GetProjectDocument,
      variables: {
        id: TEST_PROJECT_ID,
      },
    },
    result: SINGLE_PROJECT_RESULT,
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
            },
            pendingInvitations: [],
            githubRepos: [
              {
                __typename: "ProjectGithubRepos",
                projectId: TEST_PROJECT_ID,
                githubRepoId: TEST_GITHUB_REPO_ID,
                repoContributors: [
                  {
                    user: {
                      __typename: "GithubUsers",
                      id: TEST_GITHUB_USER_ID,
                      login: "user",
                      avatarUrl: "",
                      htmlUrl: "",
                      user: null,
                    },
                  },
                ],
              },
            ],
            budgets: [],
            projectLeads: [],
          },
        ],
      } as GetProjectsForSidebarQueryResult["data"],
    },
  },
  {
    request: { query: GetProjectContributorsForOverviewDocument },
    result: {
      data: {
        projectsByPk: {
          __typename: "Projects",
          githubRepos: [
            {
              __typename: "ProjectGithubRepos",
              projectId: TEST_PROJECT_ID,
              githubRepoId: TEST_GITHUB_REPO_ID,
              repoContributors: [{ user: { login: TEST_GITHUB_CONTRIBUTOR_LOGIN, avatarUrl: "avatarUrl" } }],
            },
          ],
        },
      } as GetProjectContributorsForOverviewQueryResult["data"],
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

describe("Integration tests", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should be able to access the profile page and display profile info when having a token in local storage", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Profile}`,
        mocks: graphQlMocks,
      }),
    });
    await screen.findByText(EDIT_PROFILE_TITLE);
  });

  it("should redirect to the projects page if the profile route is accessed without a token in the local storage", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Profile, mocks: graphQlMocks }),
    });
    await screen.findAllByText("Filter");
    expect(window.location.pathname).toBe(RoutePaths.Projects);
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
    await screen.findByText("Filter");
    expect(window.location.pathname).toBe(RoutePaths.Projects);
  });
});
