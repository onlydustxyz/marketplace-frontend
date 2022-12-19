import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

import App, { RoutePaths } from ".";
import { AUTH_CODE_QUERY_KEY } from "src/pages/Login";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useAuth";
import { checkLocalStorageValue, MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { GET_PROJECTS_QUERY } from "src/pages/Projects";
import { GET_PROFILE_QUERY } from "src/pages/Profile";
import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { GET_MY_PROJECT_QUERY } from "src/pages/MyProjects";
import { ProjectDetailsTab, GET_PROJECT_USER_QUERY } from "src/pages/ProjectDetails";
import { buildGithubLink } from "src/utils/stringUtils";

const AUTH_CODE_TEST_VALUE = "code";
const LOGGING_IN_TEXT_QUERY = /logging in.../i;
const AUTH_TOKEN_MISSING_TEXT_QUERY = /github authentication token missing!/i;
const TEST_USER_ID = "test-user-id";
const TEST_USER_EMAIL = "test@user.email";
const EDIT_PROFILE_TITLE = "Edit profile";
const PROFILE_BUTTON_TEST_ID = "profile-button";
const LOGOUT_BUTTON_TEST_ID = "logout-button";
const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "TEST_ACCESS_TOKEN",
};
const HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "VALID_ACCESS_TOKEN",
};

const TEST_PROJECT_ID = "test-project-id";
const TEST_PROJECT_NAME = "test-project-name";
const TEST_TELEGRAM_LINK = "test-link";
const TEST_DESCRIPTION = "test-description";
const TEST_GITHUB_REPO_NAME = "test-github-repo-name";
const TEST_GITHUB_REPO_OWNER = "test-github-repo-owner";
const TEST_GITHUB_REPO_CONTENT = "test-github-repo-content";
const TEST_GITHUB_CONTRIBUTOR_LOGIN = "test-github-contributor-login";
const TEST_GITHUB_LINK = buildGithubLink(TEST_GITHUB_REPO_OWNER, TEST_GITHUB_REPO_NAME);

expect.extend(matchers);

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_BASIC_TEST_VALUE }),
  },
}));

vi.mock("jwt-decode", () => ({
  default: (jwt: string) => {
    if (jwt === "VALID_ACCESS_TOKEN") {
      return { [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_PROJECT_ID}"}` } };
    } else throw "Error";
  },
}));

const graphQlMocks = [
  {
    request: {
      query: GET_PROJECTS_QUERY,
    },
    result: {
      data: {
        projects: [
          {
            id: TEST_PROJECT_ID,
            name: TEST_PROJECT_NAME,
            projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION },
            githubRepo: {
              name: TEST_GITHUB_REPO_NAME,
              owner: TEST_GITHUB_REPO_OWNER,
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
    request: {
      query: GET_PROFILE_QUERY,
      variables: {
        id: TEST_USER_ID,
      },
    },
    result: {
      data: {
        user: { id: TEST_USER_ID, email: TEST_USER_EMAIL, metadata: {} },
      },
    },
  },
  {
    request: {
      query: GET_MY_PROJECT_QUERY,
      variables: {
        id: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          name: TEST_PROJECT_NAME,
          budgets: [{ initialAmount: 500, remainingAmount: 300 }],
          projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION },
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
          projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION },
          githubRepo: {
            name: TEST_GITHUB_REPO_NAME,
            owner: TEST_GITHUB_REPO_OWNER,
            content: {
              readme: {
                content: btoa(TEST_GITHUB_REPO_CONTENT),
              },
              contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
            },
          },
        },
      },
    },
  },
];

describe('"Login" page', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should log in and go to projects page if a refresh token is passed as a query parameter in the URL", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`,
        mocks: graphQlMocks,
      }),
    });
    await screen.findByText(LOGGING_IN_TEXT_QUERY);
    await screen.findByText(EDIT_PROFILE_TITLE);
    expect(screen.queryByText(LOGGING_IN_TEXT_QUERY)).not.toBeInTheDocument();
    checkLocalStorageValue({
      key: LOCAL_STORAGE_TOKEN_SET_KEY,
      expectedIncludedObject: HASURA_TOKEN_BASIC_TEST_VALUE,
    });
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

  it("should display an error message if no refresh token is passed as a query parameter in the URL", async () => {
    renderWithIntl(<App />, { wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Login, mocks: graphQlMocks }) });
    await screen.findByText(AUTH_TOKEN_MISSING_TEXT_QUERY);
    checkLocalStorageValue({
      key: LOCAL_STORAGE_TOKEN_SET_KEY,
      expectNotToExist: true,
    });
  });

  it("should redirect to the projects page if the profile route is accessed without a token in the local storage", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Profile, mocks: graphQlMocks }),
    });
    await screen.findByText(TEST_PROJECT_NAME);
  });

  it("should be able to access the my projects page when having a token with the right jwt in local storage", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.MyProjects}`,
        mocks: graphQlMocks,
      }),
    });
    await screen.findByText(TEST_PROJECT_NAME);
  });

  it("should be able to access the project details page from the projects list and only see the overview tab", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Projects}`,
        mocks: graphQlMocks,
      }),
    });
    userEvent.click(await screen.findByText(TEST_PROJECT_NAME));
    await waitFor(() => {
      screen.getByText(ProjectDetailsTab.Overview);
      screen.getByText(TEST_GITHUB_CONTRIBUTOR_LOGIN);
      screen.getByText(TEST_GITHUB_REPO_CONTENT);
      expect(
        screen
          .getByRole("link", {
            name: /link/i,
          })
          .getAttribute("href")
      ).toEqual(TEST_GITHUB_LINK);
    });

    expect(screen.queryByText(ProjectDetailsTab.Payments)).not.toBeInTheDocument();
  });

  it("should be able to access the project details page from the my projects list and see both the overview and payment tabs", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.MyProjects}`,
        mocks: graphQlMocks,
      }),
    });
    userEvent.click(await screen.findByText(TEST_PROJECT_NAME));
    await screen.findByText(ProjectDetailsTab.Overview);
    await screen.findByText(ProjectDetailsTab.Payments);
  });

  it("should redirect to project list when logging out", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.MyProjects}`,
        mocks: graphQlMocks,
      }),
    });
    userEvent.click(await screen.findByTestId(PROFILE_BUTTON_TEST_ID));
    userEvent.click(await screen.findByTestId(LOGOUT_BUTTON_TEST_ID));
    await screen.findByText(TEST_PROJECT_NAME);
  });
});
