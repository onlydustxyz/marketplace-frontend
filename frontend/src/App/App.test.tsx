import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

import App, { RoutePaths } from ".";
import { AUTH_CODE_QUERY_KEY } from "src/pages/Login";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { GET_PROFILE_QUERY } from "src/pages/Profile";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { GET_PROJECT_QUERY } from "src/pages/ProjectDetails";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { GET_PROJECTS_FOR_SIDEBAR_QUERY } from "src/pages/ProjectDetails/Sidebar";
import { buildGetProjectsQuery } from "src/pages/Projects/AllProjects";
import { ProjectDetailsTab__deprecated } from "src/pages/ProjectDetails/ProjectDetailsContext";
import {
  PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
  PENDING_USER_PAYMENTS_AND_PAYOUT_SETTINGS,
} from "src/pages/Login/hooks/useSignUpRedirection";
import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import { generatePath } from "react-router-dom";
import { GET_MY_CONTRIBUTIONS_QUERY } from "src/pages/MyContributions";

const AUTH_CODE_TEST_VALUE = "code";
const LOGGING_IN_TEXT_QUERY = /logging in.../i;
const AUTH_TOKEN_MISSING_TEXT_QUERY = /github authentication token missing!/i;
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
const TEST_GITHUB_REPO_NAME = "test-github-repo-name";
const TEST_GITHUB_REPO_OWNER = "test-github-repo-owner";
const TEST_GITHUB_REPO_CONTENT = "test-github-repo-content";
const TEST_GITHUB_CONTRIBUTOR_LOGIN = "test-github-contributor-login";
const TEST_PROJECT_LEAD_DISPLAY_NAME = "test-project-lead-display-name";
const TEST_PROJECT_LEAD_AVATAR_URL = "http://foo.bar/plop.png";
const TEST_PROJECT_LEAD_USER_ID = "test-lead-user-id";

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

const ALL_PROJECTS_RESULT = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: TEST_PROJECT_ID,
        name: TEST_PROJECT_NAME,
        projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION, logoUrl: null },
        projectLeads: [
          {
            user: {
              displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
              avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
            },
          },
        ],
        pendingInvitations: [],
        githubRepo: {
          name: TEST_GITHUB_REPO_NAME,
          owner: TEST_GITHUB_REPO_OWNER,
          content: {
            contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
            logoUrl: null,
          },
        },
      },
    ],
  },
};

const SINGLE_PROJECT_RESULT = {
  data: {
    projectsByPk: {
      __typename: "Projects",
      name: TEST_PROJECT_NAME,
      budgetsAggregate: {
        aggregate: {
          sum: {
            spentAmount: 123,
          },
        },
      },
      projectDetails: { telegramLink: TEST_TELEGRAM_LINK, description: TEST_DESCRIPTION },
      projectLeads: [
        {
          userId: TEST_PROJECT_LEAD_USER_ID,
          user: {
            displayName: TEST_PROJECT_LEAD_DISPLAY_NAME,
            avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
          },
        },
      ],
      pendingInvitations: [{ id: "invitation-id" }],
      githubRepo: {
        name: TEST_GITHUB_REPO_NAME,
        owner: TEST_GITHUB_REPO_OWNER,
        content: {
          readme: {
            content: btoa(TEST_GITHUB_REPO_CONTENT),
          },
          contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN, avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL }],
        },
        languages: {},
      },
    },
  },
};

const graphQlMocks = [
  {
    request: {
      query: buildGetProjectsQuery([]),
      variables: { githubUserId: TEST_GITHUB_USER_ID, languages: [] },
    },
    result: ALL_PROJECTS_RESULT,
  },
  {
    request: {
      query: buildGetProjectsQuery([]),
      variables: { githubUserId: undefined, languages: [] },
    },
    result: ALL_PROJECTS_RESULT,
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
      query: GET_PROJECT_QUERY,
      variables: {
        id: TEST_PROJECT_ID,
      },
    },
    result: SINGLE_PROJECT_RESULT,
  },
  {
    request: {
      query: GET_PROJECT_QUERY,
      variables: {
        githubUserId: TEST_GITHUB_USER_ID,
        id: TEST_PROJECT_ID,
      },
    },
    result: SINGLE_PROJECT_RESULT,
  },
  {
    request: {
      query: GET_PROJECTS_FOR_SIDEBAR_QUERY,
    },
    result: {
      data: {
        projects: [
          {
            id: TEST_PROJECT_ID,
            name: TEST_PROJECT_NAME,
            pendingInvitations: [],
            githubRepo: {
              content: {
                contributors: [{ login: TEST_GITHUB_CONTRIBUTOR_LOGIN }],
              },
            },
          },
        ],
      },
    },
  },
];

const pendingProjectLeadInvitationMock = {
  request: {
    query: PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
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
    },
  },
};

const pendingPaymentsMock = {
  request: {
    query: PENDING_USER_PAYMENTS_AND_PAYOUT_SETTINGS,
    variables: { userId: TEST_USER_ID },
  },
  result: {
    data: {
      user: {
        userInfo: { payoutSettings: null },
        githubUser: {
          paymentRequests: [
            {
              amountInUsd: 100,
              paymentsAggregate: { aggregate: { sum: { amount: null } } },
            },
          ],
        },
      },
    },
  },
};

const paymentRequestsMock = {
  request: {
    query: GET_MY_CONTRIBUTIONS_QUERY,
    variables: {
      githubUserId: TEST_GITHUB_USER_ID,
    },
  },
  result: {
    data: {
      paymentRequests: [
        {
          id: "705e6b37-d0ee-4e87-b681-7009dd691965",
          payments: [
            {
              amount: 100,
              currencyCode: "USD",
            },
            {
              amount: 100,
              currencyCode: "USD",
            },
          ],
          amountInUsd: 200,
          reason: { work_items: ["link_to_pr"] },
          budget: {
            project: {
              id: "632d5da7-e590-4815-85ea-82a5585e6049",
              name: "MyAwesomeProject",
              projectDetails: {
                description: "SOOOOOO awesome",
                logoUrl: null,
              },
              githubRepo: null,
            },
          },
        },
      ],
    },
  },
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
    await screen.findByText(TEST_PROJECT_NAME);
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

  it("should display an error message if no refresh token is passed as a query parameter in the URL", async () => {
    renderWithIntl(<App />, { wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Login, mocks: graphQlMocks }) });
    await screen.findByText(AUTH_TOKEN_MISSING_TEXT_QUERY);
  });

  it("should redirect to the projects page if the profile route is accessed without a token in the local storage", async () => {
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({ route: RoutePaths.Profile, mocks: graphQlMocks }),
    });
    await screen.findByText(TEST_PROJECT_NAME);
  });

  it("should be able to access the project details page from the projects list and see the tabs", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Projects}`,
        mocks: graphQlMocks,
      }),
    });
    userEvent.click(await screen.findByText(TEST_PROJECT_NAME));
    await waitFor(() => {
      screen.getByText(TEST_PROJECT_LEAD_DISPLAY_NAME);
      screen.getByText(TEST_GITHUB_REPO_CONTENT);
      expect(screen.getAllByText(/project lead/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/contributors/i)).toHaveLength(2);
      screen.getByText(/money granted/i);
    });

    expect((await screen.findAllByText(ProjectDetailsTab__deprecated.Overview)).length).toEqual(2);
    expect(screen.queryByText(ProjectDetailsTab__deprecated.Payments)).not.toBeInTheDocument();
    expect(screen.findByText(ProjectDetailsTab__deprecated.Contributors));
    await screen.findByRole("img", { name: /github logo/i });
    await screen.findByRole("img", { name: /telegram logo/i });
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
    await screen.findByText(TEST_PROJECT_NAME);
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
    renderWithIntl(<App />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`,
        mocks: [...graphQlMocks, pendingPaymentsMock, paymentRequestsMock],
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
