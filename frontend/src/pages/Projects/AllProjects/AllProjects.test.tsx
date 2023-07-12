import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import AllProjects, { DEFAULT_SORTING, buildQuerySorting } from ".";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY } from "src/types";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import {
  GetProjectsDocument,
  GetProjectsQueryResult,
  GetProjectsQueryVariables,
  ProjectCardFieldsFragment,
} from "src/__generated/graphql";
import { MockedProjectFilterProvider, Ownership, ProjectFilter } from "src/pages/Projects/useProjectFilter";
import { MockedResponse } from "@apollo/client/testing";

expect.extend(matchers);

const TEST_PROJECT_ID = "2";
const TEST_GITHUB_USER_ID = 123456;

const ALL_PROJECTS_RESULT_WITH_INVITATION: { data: GetProjectsQueryResult["data"] } = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: "1",
        projectDetails: {
          projectId: "1",
          name: "project-1",
          logoUrl: null,
          shortDescription: "short description",
          telegramLink: null,
          hiring: false,
          rank: 0,
          visibility: "public",
        },
        budgetsAggregate: {
          aggregate: {
            count: 1,
            sum: {
              spentAmount: 1000,
              initialAmount: 1000,
            },
          },
        },
        contributors: [],
        githubReposAggregate: { aggregate: { count: 1 } },
        contributorsAggregate: { aggregate: { count: 12 } },
        pendingInvitations: [],
        githubRepos: [
          {
            projectId: "1",
            githubRepoId: 123456,
            repo: {
              id: 123456,
              languages: [],
            },
          },
        ],
        projectLeads: [
          {
            userId: "user-1",
            projectId: "1",
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar", githubUserId: 12345 },
          },
        ],
        projectSponsors: [],
      },
      {
        __typename: "Projects",
        id: "2",
        projectDetails: {
          projectId: "2",
          name: "project-2",
          logoUrl: null,
          shortDescription: "short description",
          telegramLink: null,
          hiring: false,
          rank: 0,
          visibility: "public",
        },
        budgetsAggregate: {
          aggregate: {
            count: 1,
            sum: {
              spentAmount: 999,
              initialAmount: 1000,
            },
          },
        },
        contributors: [],
        githubReposAggregate: { aggregate: { count: 1 } },
        contributorsAggregate: { aggregate: { count: 2 } },
        pendingInvitations: [],
        githubRepos: [
          {
            projectId: "2",
            githubRepoId: 123456,
            repo: {
              id: 123456,
              languages: [],
            },
          },
        ],
        projectLeads: [
          {
            userId: "user-1",
            projectId: "2",
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar", githubUserId: 12345 },
          },
        ],
        projectSponsors: [],
      },
      {
        __typename: "Projects",
        id: "3",
        projectDetails: {
          projectId: "3",
          name: "project-3",
          logoUrl: null,
          shortDescription: "short description",
          telegramLink: null,
          hiring: false,
          rank: 0,
          visibility: "public",
        },
        budgetsAggregate: {
          aggregate: {
            count: 1,
            sum: {
              spentAmount: 0,
              initialAmount: 1000,
            },
          },
        },
        contributors: [],
        githubReposAggregate: { aggregate: { count: 1 } },
        contributorsAggregate: { aggregate: { count: 0 } },
        pendingInvitations: [{ id: "invitation-1", githubUserId: TEST_GITHUB_USER_ID }],
        githubRepos: [
          {
            projectId: "3",
            githubRepoId: 123456,
            repo: {
              id: 123456,
              languages: [],
            },
          },
        ],
        projectLeads: [
          {
            userId: "user-1",
            projectId: "3",
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar", githubUserId: 12345 },
          },
        ],
        projectSponsors: [],
      },
    ],
  },
};

const projectWithNoBudget: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-budget",
  budgetsAggregate: {
    aggregate: {
      count: 0,
      sum: { spentAmount: 0, initialAmount: 1000 },
    },
  },
  contributorsAggregate: { aggregate: { count: 0 } },
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  projectDetails: {
    projectId: "project-with-no-budget",
    name: "No budget",
    shortDescription: "This project has no budget yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
    visibility: "public",
  },
  githubRepos: [
    {
      projectId: "project-with-no-budget",
      githubRepoId: 123456,
      repo: {
        id: 123456,
        languages: [],
      },
    },
  ],
  pendingInvitations: [],
  projectLeads: [
    {
      userId: "user-1",
      projectId: "project-with-no-budget",
      user: { id: "user-1", login: "leader", avatarUrl: "avatar", githubUserId: 12345 },
    },
  ],
  projectSponsors: [],
};

const projectWithNoRepo: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-repo",
  budgetsAggregate: {
    aggregate: {
      count: 1,
      sum: { spentAmount: 0, initialAmount: 1000 },
    },
  },
  contributorsAggregate: { aggregate: { count: 0 } },
  contributors: [],
  githubReposAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-no-repo",
    name: "No budget",
    shortDescription: "This project has no repo yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
    visibility: "public",
  },
  githubRepos: [],
  pendingInvitations: [],
  projectLeads: [
    {
      userId: "user-1",
      projectId: "project-with-no-repo",
      user: { id: "user-1", login: "leader", avatarUrl: "avatar", githubUserId: 12345 },
    },
  ],
  projectSponsors: [],
};

const projectWithNoLeader: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-leader",
  budgetsAggregate: {
    aggregate: {
      count: 1,
      sum: { spentAmount: 0, initialAmount: 1000 },
    },
  },
  contributorsAggregate: { aggregate: { count: 0 } },
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  projectDetails: {
    projectId: "project-with-no-leader",
    name: "No budget",
    shortDescription: "This project has no leader yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
    visibility: "public",
  },
  githubRepos: [
    {
      projectId: "project-with-no-leader",
      githubRepoId: 123456,
      repo: {
        id: 123456,
        languages: [],
      },
    },
  ],
  pendingInvitations: [],
  projectLeads: [],
  projectSponsors: [],
};

const projectInvalidWithInvite: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-only-invite",
  budgetsAggregate: {
    aggregate: {
      count: 0,
      sum: { spentAmount: 0, initialAmount: 1000 },
    },
  },
  contributorsAggregate: { aggregate: { count: 0 } },
  contributors: [],
  githubReposAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-only-invite",
    name: "Nothing but invited",
    shortDescription: "This project has just been created and will only be visible to the invited leader",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
    visibility: "public",
  },
  githubRepos: [],
  pendingInvitations: [{ id: "invitation-1", githubUserId: TEST_GITHUB_USER_ID }],
  projectLeads: [],
  projectSponsors: [],
};

const projectWithNoLeaderAndInviteForWrongUser: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-leader-and-invite-for-wrong-user",
  budgetsAggregate: {
    aggregate: {
      count: 1,
      sum: { spentAmount: 0, initialAmount: 1000 },
    },
  },
  contributorsAggregate: { aggregate: { count: 0 } },
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  projectDetails: {
    projectId: "project-with-no-leader",
    name: "No leader but invite",
    shortDescription: "This project has no leader yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
    visibility: "public",
  },
  githubRepos: [
    {
      projectId: "project-with-no-leader-and-invite-for-wrong-user",
      githubRepoId: 123456,
      repo: {
        id: 123456,
        languages: [],
      },
    },
  ],
  pendingInvitations: [{ id: "invitation-1", githubUserId: 654321 }],
  projectLeads: [],
  projectSponsors: [],
};

const projectWithNoLeaderAndInvite: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-leader-and-invite",
  contributorsAggregate: { aggregate: { count: 0 } },
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  budgetsAggregate: {
    aggregate: {
      count: 1,
      sum: { spentAmount: 0, initialAmount: 1000 },
    },
  },
  projectDetails: {
    projectId: "project-with-no-leader",
    name: "No leader but invite",
    shortDescription: "This project has no leader yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
    visibility: "public",
  },
  githubRepos: [
    {
      projectId: "project-with-no-leader-and-invite",
      githubRepoId: 123456,
      repo: {
        id: 123456,
        languages: [],
      },
    },
  ],
  pendingInvitations: [{ id: "invitation-1", githubUserId: TEST_GITHUB_USER_ID }],
  projectLeads: [],
  projectSponsors: [],
};

const buildGraphQlMocks = (projectsQueryResult: { data: GetProjectsQueryResult["data"] }) => [
  {
    request: {
      query: GetProjectsDocument,
      variables: {
        where: {},
        orderBy: buildQuerySorting(DEFAULT_SORTING),
      } as GetProjectsQueryVariables,
    },
    result: projectsQueryResult,
  },
];

const HASURA_TOKEN = {
  user: {
    id: "user-id",
  },
  accessToken: "VALID_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
  refreshToken: "test-refresh-token",
};

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: HASURA_TOKEN,
    }),
  },
}));

vi.mock("jwt-decode", () => ({
  default: () => {
    return {
      [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_PROJECT_ID}"}`, [GITHUB_USERID_KEY]: TEST_GITHUB_USER_ID },
    };
  },
}));

const render = ({ projectFilter, mocks }: { projectFilter?: ProjectFilter; mocks: MockedResponse[] }) =>
  renderWithIntl(
    <MockedProjectFilterProvider projectFilter={projectFilter}>
      <AllProjects
        search=""
        clearSearch={() => {
          return;
        }}
      />
    </MockedProjectFilterProvider>,
    {
      wrapper: MemoryRouterProviderFactory({
        mocks,
      }),
    }
  );

describe("All projects", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should only show projects led if project ownership type is 'mine'", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN));
    render({
      projectFilter: { ownership: Ownership.Mine, technologies: [], sponsors: [] },
      mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_WITH_INVITATION),
    });
    await screen.findByText("project-2");
    await screen.findByText("project-3");
  });

  it("should only show valid projects", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN));
    render({
      mocks: [
        ...buildGraphQlMocks({
          data: {
            projects: [
              projectWithNoBudget,
              projectWithNoLeader,
              projectWithNoRepo,
              projectInvalidWithInvite,
              projectWithNoLeaderAndInviteForWrongUser,
              projectWithNoLeaderAndInvite,
            ],
          },
        }),
      ],
    });
    const allProjectCards = await screen.findAllByTestId("project-card");
    expect(allProjectCards).toHaveLength(1);
    expect(screen.getByText("No leader but invite"));
  });

  it("should display fallback screen when no project", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN));
    render({
      mocks: [
        ...buildGraphQlMocks({
          data: { projects: [] },
        }),
      ],
    });

    await waitFor(() => expect(screen.getByText("Nothing to show")));
  });
});
