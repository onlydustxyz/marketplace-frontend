import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

import App, { RoutePaths } from ".";
import { AUTH_CODE_QUERY_KEY } from "src/pages/Login";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { buildGetProjectsQuery } from "src/pages/Projects/AllProjects";
import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import { generatePath } from "react-router-dom";
import {
  GetGithubRepositoryDetailsDocument,
  GetGithubRepositoryDetailsQueryResult,
  GetPaymentRequestsDocument,
  GetPaymentRequestsQueryResult,
  GetProjectContributorsForOverviewDocument,
  GetProjectContributorsForOverviewQueryResult,
  GetProjectDocument,
  GetProjectOverviewDetailsDocument,
  GetProjectOverviewDetailsQueryResult,
  GetProjectQueryResult,
  GetProjectsForSidebarDocument,
  GetProjectsForSidebarQueryResult,
  GetProjectsQueryResult,
  GetUserPayoutSettingsDocument,
  GetUserPayoutSettingsQueryResult,
  PendingProjectLeaderInvitationsDocument,
  PendingProjectLeaderInvitationsQueryResult,
  PendingUserPaymentsDocument,
  PendingUserPaymentsQueryResult,
  ProfileDocument,
  ProfileQueryResult,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";

const AUTH_CODE_TEST_VALUE = "code";
const LOGGING_IN_TEXT_QUERY = /logging in.../i;
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
            githubRepoDetails: null,
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
      pendingInvitations: [{ id: "invitation-id", githubUserId: TEST_GITHUB_USER_ID }],
      githubRepos: [
        {
          __typename: "ProjectGithubRepos",
          projectId: TEST_PROJECT_ID,
          githubRepoId: TEST_GITHUB_REPO_ID,
          githubRepoDetails: null,
        },
      ],
      projectSponsors: [],
      budgets: [{ __typename: "Budgets", id: "budget-1", paymentRequests: [] }],
    },
  },
};

const GITHUB_REPO_DETAILS_RESULT: { data: GetGithubRepositoryDetailsQueryResult["data"] } = {
  data: {
    githubRepoDetailsByPk: {
      __typename: "GithubRepoDetails",
      id: TEST_GITHUB_REPO_ID,
      languages: {},
      content: {
        __typename: "Repo",
        id: TEST_GITHUB_REPO_ID,
        owner: TEST_GITHUB_REPO_OWNER,
        name: TEST_GITHUB_REPO_NAME,
        description: TEST_GITHUB_REPO_CONTENT,
        htmlUrl: "url",
        stars: 0,
        forksCount: 0,
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
          githubRepoDetails: { content: { stars: 1000 } },
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
            id: TEST_PROJECT_ID,
            projectDetails: {
              projectId: TEST_PROJECT_ID,
              name: TEST_PROJECT_NAME,
              logoUrl: null,
            },
            pendingInvitations: [],
            githubRepos: [
              {
                projectId: TEST_PROJECT_ID,
                githubRepoId: TEST_GITHUB_REPO_ID,
                githubRepoDetails: {
                  id: TEST_GITHUB_REPO_ID,
                  content: {
                    id: TEST_GITHUB_REPO_ID,
                    contributors: [
                      {
                        id: TEST_GITHUB_USER_ID,
                      },
                    ],
                  },
                },
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
              githubRepoDetails: {
                content: {
                  contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN, avatarUrl: "avatarUrl" }],
                },
              },
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
          projectId: TEST_PROJECT_ID,
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
      user: {
        __typename: "users",
        id: TEST_USER_ID,
        githubUser: {
          __typename: "AuthGithubUsers",
          userId: TEST_USER_ID,
          paymentRequests: [
            {
              __typename: "PaymentRequests",
              id: "payment-1",
              amountInUsd: 100,
              paymentsAggregate: { aggregate: { sum: { amount: null } } },
            },
          ],
        },
      },
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
              paymentId: "705e6b37-d0ee-4e87-b681-7009dd691965",
              repoId: 123456,
              issueNumber: 123,
            },
          ],
          invoiceReceivedAt: null,
          budget: {
            __typename: "Budgets",
            id: "budget-1",
            project: {
              __typename: "Projects",
              id: "632d5da7-e590-4815-85ea-82a5585e6049",
              projectDetails: {
                __typename: "ProjectDetails",
                projectId: "632d5da7-e590-4815-85ea-82a5585e6049",
                shortDescription: "SOOOOOO awesome",
                logoUrl: null,
                name: "MyAwesomeProject",
              },
            },
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
  newData: () => ({
    data: {
      authGithubUsers: [
        {
          __typename: "AuthGithubUsers",
          userId: TEST_USER_ID,
          user: {
            __typename: "users",
            id: TEST_USER_ID,
            userInfo: {
              __typename: "UserInfo",
              userId: TEST_USER_ID,
              identity: null,
              location: null,
              payoutSettings: null,
              arePayoutSettingsValid: false,
            } as UserPayoutSettingsFragment,
          },
        },
      ],
    } as GetUserPayoutSettingsQueryResult["data"],
  }),
};

Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 2000 });

describe("Integration tests", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should log in and go to projects page if a refresh token is passed as a query parameter in the URL", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`,
        mocks: graphQlMocks,
      }),
    });
    await screen.findAllByText(TEST_PROJECT_NAME);
    expect(screen.queryByText(LOGGING_IN_TEXT_QUERY)).not.toBeInTheDocument();
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

  it("should redirect to homegae if no refresh token is passed as a query parameter in the URL", async () => {
    renderWithIntl(<App />, { wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Login, mocks: graphQlMocks }) });
    expect(window.location.pathname).toBe(RoutePaths.Projects);
  });

  it("should redirect to the projects page if the profile route is accessed without a token in the local storage", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Profile, mocks: graphQlMocks }),
    });
    await screen.findAllByText(TEST_PROJECT_NAME);
  });

  it("should be able to access the project details page from the projects list and see the tabs", async () => {
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
    await screen.findAllByText(TEST_PROJECT_NAME);
  });

  it("should redirect to project details with pending invitation at first sign-in", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`,
        mocks: [...graphQlMocks, pendingProjectLeadInvitationMock],
      }),
    });
    await screen.findByTestId("accept-invite-button");
  });

  it("should redirect to profile page if pending payments and missing payout info at first sign-in", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`,
        mocks: [...graphQlMocks, pendingPaymentsMock, paymentRequestsMock, payoutSettingsMock],
      }),
    });
    await screen.findByText("MyAwesomeProject");
  });

  it("should redirect to last visited page if not first sign-in", async () => {
    window.localStorage.setItem(
      LOCAL_STORAGE_SESSION_KEY,
      JSON.stringify({
        lastLoginTime: "132456",
        visitedPageBeforeLogin: generatePath(RoutePaths.ProjectDetails, { projectId: TEST_PROJECT_ID }),
      })
    );

    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`,
        mocks: graphQlMocks,
      }),
    });
    await screen.findByTestId("accept-invite-button");
  });
});
