import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

expect.extend(matchers);

import { generatePath, Route, Routes } from "react-router-dom";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectDetails from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { LOCAL_STORAGE_SESSION_KEY } from "src/hooks/useSession";
import { CLAIMS_KEY, GITHUB_USERID_KEY, Project, PROJECTS_LED_KEY } from "src/types";
import Overview from "src/pages/ProjectDetails/Overview";
import {
  GetProjectIdFromKeyDocument,
  GetProjectIdFromKeyQueryResult,
  GetProjectLeadInvitationsDocument,
  GetProjectLeadInvitationsQueryResult,
  GetProjectOverviewDetailsDocument,
  GetProjectOverviewDetailsQueryResult,
  GetProjectsForSidebarDocument,
  GetProjectVisibilityDetailsDocument,
  GetProjectVisibilityDetailsQueryResult,
} from "src/__generated/graphql";
import { MockedResponse } from "@apollo/client/testing";

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

const getProjectIdMock: MockedResponse = {
  request: {
    query: GetProjectIdFromKeyDocument,
    variables: {
      projectKey: TEST_PROJECT_ID,
    },
  },
  result: {
    data: {
      projects: [
        {
          __typename: "Projects",
          id: TEST_PROJECT_ID,
          key: TEST_PROJECT_ID,
        },
      ],
    } as GetProjectIdFromKeyQueryResult["data"],
  },
};

const getProjectMock = {
  request: {
    query: GetProjectOverviewDetailsDocument,
    variables: {
      projectId: TEST_PROJECT_ID,
    },
  },
  result: {
    data: {
      projects: [
        {
          __typename: "Projects",
          id: TEST_PROJECT_ID,
          key: TEST_PROJECT_ID,
          usdBudget: {
            spentAmount: 1000,
            initialAmount: 1000,
          },
          contributors: [],
          name: TEST_PROJECT_NAME,
          moreInfoLink: TEST_TELEGRAM_LINK,
          longDescription: TEST_DESCRIPTION,
          logoUrl: null,
          hiring: false,
          visibility: "PUBLIC",
          contributorsAggregate: { aggregate: { count: 0 } },
          pendingInvitations: [{ id: "test-project-id", githubUserId: TEST_GITHUB_USER_ID }],
          projectLeads: [
            {
              user: {
                id: "test-user-id",
                login: TEST_PROJECT_LEAD_DISPLAY_NAME,
                avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
                githubUserId: 12345,
              },
            },
          ],
          githubRepos: [{ repo: null }],
          sponsors: [],
        },
      ],
    } as GetProjectOverviewDetailsQueryResult["data"],
  },
};

const getProjectVisibilityMock = (projectId: string) => ({
  request: {
    query: GetProjectVisibilityDetailsDocument,
    variables: {
      projectId,
    },
  },
  result: {
    data: {
      projects: [
        {
          __typename: "Projects",
          id: projectId,
          key: projectId,
          usdBudgetId: "budget-id",
          contributors: [],
          pendingContributors: [],
          rewardedUsers: [],
          githubReposAggregate: { aggregate: { count: 1 } },
          pendingInvitations: [],
          projectLeads: [{ userId: "user-1" }],
          visibility: "PUBLIC",
        },
      ],
    } as GetProjectVisibilityDetailsQueryResult["data"],
  },
});

const getLedProjectMock = {
  request: {
    query: GetProjectOverviewDetailsDocument,
    variables: {
      projectId: TEST_LED_PROJECT_ID,
    },
  },
  result: {
    data: {
      projects: [
        {
          __typename: "Projects",
          id: TEST_LED_PROJECT_ID,
          key: TEST_LED_PROJECT_ID,
          usdBudget: {
            spentAmount: 1000,
            initialAmount: 1000,
          },
          contributors: [],
          contributorsAggregate: { aggregate: { count: 0 } },
          name: TEST_LED_PROJECT_NAME,
          moreInfoLink: TEST_TELEGRAM_LINK,
          longDescription: TEST_DESCRIPTION,
          logoUrl: null,
          hiring: false,
          visibility: "PUBLIC",
          pendingInvitations: [],
          projectLeads: [
            {
              user: {
                id: "test-user-id",
                login: TEST_PROJECT_LEAD_DISPLAY_NAME,
                avatarUrl: TEST_PROJECT_LEAD_AVATAR_URL,
                githubUserId: 12345,
              },
            },
          ],
          githubRepos: [{ repo: null }],
          sponsors: [],
        },
      ],
    } as GetProjectOverviewDetailsQueryResult["data"],
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

const getProjectInvitationsMock: MockedResponse = {
  request: { query: GetProjectLeadInvitationsDocument, variables: { projectId: TEST_PROJECT_ID } },
  result: {
    data: {
      projects: [
        {
          id: TEST_PROJECT_ID,
          name: TEST_PROJECT_NAME,
          pendingInvitations: [{ id: "invitation-id", githubUserId: TEST_GITHUB_USER_ID }],
        },
      ],
    } as GetProjectLeadInvitationsQueryResult["data"],
  },
};

const graphQlMocks = [
  getProjectMock,
  getProjectIdMock,
  getLedProjectMock,
  getProjectForSidebarMock,
  getProjectInvitationsMock,
  getProjectVisibilityMock(TEST_LED_PROJECT_ID),
  getProjectVisibilityMock(TEST_PROJECT_ID),
];

vi.mock("usehooks-ts", async () => {
  const useHooksModule = await vi.importActual<typeof import("usehooks-ts")>("usehooks-ts");
  return {
    ...useHooksModule,
    useMediaQuery: jest.fn().mockReturnValue(false),
  };
});

// Create a client
const queryClient = new QueryClient();

const PROJECT: Project = {
  id: "test-project-id",
  slug: "performance-test-with-a-very-long-name",
  name: "Performance test with a very long name",
  shortDescription: "Do not create issue on this one as it is linked with real projects !",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/1409408835957028656.png",
  hiring: false,
  visibility: "PUBLIC",
  repoCount: 2,
  contributorCount: 3,
  moreInfoUrl: "www.onlydust.xyz",
  leaders: [
    {
      githubUserId: 498695724,
      login: "AnthonyBuisset",
      htmlUrl: null,
      avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
      id: "adcb11a6-92cf-4a1e-bace-79f7bdbc54e7",
    },
    {
      githubUserId: 498695724,
      login: "ofux",
      htmlUrl: null,
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      id: "bd365490-dd23-4a24-ad23-7853fbd853c2",
    },
  ],
  repos: [
    {
      id: 566371874,
      owner: "onlydustxyz",
      name: "hasura-auth",
      description: "Authentication for Hasura.",
      stars: 0,
      forkCount: 1,
      htmlUrl: "https://github.com/onlydustxyz/hasura-auth",
      hasIssues: false,
    },
    {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      description: "Contributions marketplace backend services",
      stars: 15,
      forkCount: 10,
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
      hasIssues: true,
    },
  ],
  topContributors: [
    {
      githubUserId: 698957,
      login: "ltoussaint",
      htmlUrl: "https://github.com/ltoussaint",
      avatarUrl: "https://avatars.githubusercontent.com/u/698957?v=4",
    },
    {
      githubUserId: 595505,
      login: "ofux",
      htmlUrl: "https://github.com/ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
    {
      githubUserId: 4435377,
      login: "Bernardstanislas",
      htmlUrl: "https://github.com/Bernardstanislas",
      avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
    },
  ],
  sponsors: [
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983041",
      name: "OnlyDust",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983042",
      name: "OnlyFast",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983043",
      name: "OnlyRust",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
  ],
  technologies: {
    Java: 1082,
    CPlusPlus: 22688656,
    CSS: 128024,
    C: 3655312,
    Scheme: 50648,
    CMake: 115552,
    ObjectiveCPlusPlus: 10994,
    QMake: 876,
    Makefile: 298032,
    M4: 435994,
    HTML: 285238,
    Sage: 118798,
    TypeScript: 42942,
    Dockerfile: 9068,
    Shell: 367042,
    CoffeeScript: 34960,
    CapnProto: 2512,
    JavaScript: 8236948,
    Assembly: 56732,
    Python: 6840986,
  },
  isInvitedAsProjectLead: false,
  remainingUsdBudget: 99250.0,
};

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
        <Route
          path="/p/:projectKey"
          element={
            <QueryClientProvider client={queryClient}>
              <ProjectDetails />
            </QueryClientProvider>
          }
        >
          <Route index element={<Overview />} />
        </Route>
      </Routes>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: generatePath(RoutePaths.ProjectDetails, { projectKey: TEST_PROJECT_ID }),
          mocks: graphQlMocks,
        }),
      }
    );
    await waitFor(() => {
      screen.findByText("You've been promoted to Project Lead on test-project-name");
    });
  });

  it("should store the project id if it is a project led by the user", async () => {
    renderWithIntl(<Overview />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: { project: PROJECT },
      }),
    });
    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || "{}").lastVisitedProjectId).toBe(
        PROJECT.id
      );
    });
  });

  it("should store the project id if the user has been invited as project lead", async () => {
    renderWithIntl(<Overview />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: { project: PROJECT },
      }),
    });

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || "{}").lastVisitedProjectId).toBe(
        PROJECT.id
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
          route: generatePath(RoutePaths.ProjectDetails, { projectKey: TEST_LED_PROJECT_ID }),
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
          route: generatePath(RoutePaths.ProjectDetails, { projectKey: TEST_LED_PROJECT_ID }),
          mocks: [getProjectMock],
        }),
      }
    );

    await waitFor(() => expect(window.location.pathname).toBe("/"));
  });
});
