import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import AllProjects, { buildQuerySorting } from ".";
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
import { Sorting } from "..";

expect.extend(matchers);

const TEST_PROJECT_ID = "2";
const TEST_GITHUB_USER_ID = 123456;

const ALL_PROJECTS_RESULT_NO_INVITATIONS: { data: GetProjectsQueryResult["data"] } = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: "1",
        projectDetails: {
          projectId: "1",
          name: "project1",
          shortDescription: "short description",
          logoUrl: null,
          telegramLink: null,
          hiring: false,
          rank: 0,
        },
        budgets: [{ id: "budget-1" }],
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
              initialAmount: 1000,
            },
          },
        },
        contributorsAggregate: { aggregate: { count: 0 } },
        pendingInvitations: [],
        projectLeads: [
          {
            userId: "user-1",
            projectId: "1",
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar" },
          },
        ],
        projectSponsors: [],
        githubRepos: [
          {
            githubRepoId: 123456,
            projectId: "1",
            repo: {
              id: 123456,
              languages: [],
            },
          },
        ],
      },
      {
        __typename: "Projects",
        id: "2",
        projectDetails: {
          projectId: "2",
          name: "project2",
          shortDescription: "short description",
          logoUrl: null,
          telegramLink: null,
          hiring: false,
          rank: 0,
        },
        budgets: [{ id: "budget-2" }],
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 999,
              initialAmount: 1000,
            },
          },
        },
        contributorsAggregate: { aggregate: { count: 0 } },
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
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar" },
          },
        ],
        projectSponsors: [],
      },
    ],
  },
};

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
        },
        budgets: [{ id: "budget-1" }],
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
              initialAmount: 1000,
            },
          },
        },
        contributorsAggregate: { aggregate: { count: 0 } },
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
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar" },
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
        },
        budgets: [{ id: "budget-2" }],
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 999,
              initialAmount: 1000,
            },
          },
        },
        contributorsAggregate: { aggregate: { count: 0 } },
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
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar" },
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
        },
        budgets: [{ id: "budget-3" }],
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 0,
              initialAmount: 1000,
            },
          },
        },
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
            user: { id: "user-1", login: "project lead", avatarUrl: "avatar" },
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
  budgets: [],
  budgetsAggregate: { aggregate: { sum: { spentAmount: 0, initialAmount: 1000 } } },
  contributorsAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-no-budget",
    name: "No budget",
    shortDescription: "This project has no budget yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
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
      user: { id: "user-1", login: "leader", avatarUrl: "avatar" },
    },
  ],
  projectSponsors: [],
};

const projectWithNoRepo: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-repo",
  budgets: [{ id: "budget-1" }],
  budgetsAggregate: { aggregate: { sum: { spentAmount: 0, initialAmount: 1000 } } },
  contributorsAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-no-repo",
    name: "No budget",
    shortDescription: "This project has no repo yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
  },
  githubRepos: [],
  pendingInvitations: [],
  projectLeads: [
    {
      userId: "user-1",
      projectId: "project-with-no-repo",
      user: { id: "user-1", login: "leader", avatarUrl: "avatar" },
    },
  ],
  projectSponsors: [],
};

const projectWithNoLeader: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-leader",
  budgets: [{ id: "budget-1" }],
  budgetsAggregate: { aggregate: { sum: { spentAmount: 0, initialAmount: 1000 } } },
  contributorsAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-no-leader",
    name: "No budget",
    shortDescription: "This project has no leader yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
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
  budgets: [],
  budgetsAggregate: { aggregate: { sum: { spentAmount: 0, initialAmount: 1000 } } },
  contributorsAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-only-invite",
    name: "Nothing but invited",
    shortDescription: "This project has just been created and will only be visible to the invited leader",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
  },
  githubRepos: [],
  pendingInvitations: [{ id: "invitation-1", githubUserId: TEST_GITHUB_USER_ID }],
  projectLeads: [],
  projectSponsors: [],
};

const projectWithNoLeaderAndInviteForWrongUser: ProjectCardFieldsFragment = {
  __typename: "Projects",
  id: "project-with-no-leader-and-invite-for-wrong-user",
  budgets: [{ id: "budget-1" }],
  budgetsAggregate: { aggregate: { sum: { spentAmount: 0, initialAmount: 1000 } } },
  contributorsAggregate: { aggregate: { count: 0 } },
  projectDetails: {
    projectId: "project-with-no-leader",
    name: "No leader but invite",
    shortDescription: "This project has no leader yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
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
  budgets: [{ id: "budget-1" }],
  budgetsAggregate: { aggregate: { sum: { spentAmount: 0, initialAmount: 1000 } } },
  projectDetails: {
    projectId: "project-with-no-leader",
    name: "No leader but invite",
    shortDescription: "This project has no leader yet",
    telegramLink: null,
    logoUrl: null,
    hiring: false,
    rank: 0,
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
        orderBy: buildQuerySorting(Sorting.MoneyGranted),
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
      <AllProjects sorting={Sorting.MoneyGranted} />
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

  it("should sort by money granted desc if no pending invitations", async () => {
    render({ mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_NO_INVITATIONS) });

    const moneyGrantedElementsInOrderOfAppearance = await screen.findAllByText("granted", { exact: false });
    expect(moneyGrantedElementsInOrderOfAppearance[0]).toHaveTextContent("$1K");
    expect(moneyGrantedElementsInOrderOfAppearance[1]).toHaveTextContent("$999");
  });

  it("should sort by pending invitation, then money granted desc if pending invitations", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN));
    render({ mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_WITH_INVITATION) });
    const moneyGrantedElementsInOrderOfAppearance = await screen.findAllByText("granted", { exact: false });
    expect(moneyGrantedElementsInOrderOfAppearance[0]).toHaveTextContent("$0");
    expect(moneyGrantedElementsInOrderOfAppearance[1]).toHaveTextContent("$1K");
    expect(moneyGrantedElementsInOrderOfAppearance[2]).toHaveTextContent("$999");
  });

  it("should only show projects led if project ownership type is 'mine'", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN));
    render({
      projectFilter: { ownership: Ownership.Mine, technologies: [], sponsors: [] },
      mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_WITH_INVITATION),
    });
    const moneyGrantedElementsInOrderOfAppearance = await screen.findAllByText("granted", { exact: false });
    expect(moneyGrantedElementsInOrderOfAppearance).toHaveLength(2);
    expect(moneyGrantedElementsInOrderOfAppearance[0]).toHaveTextContent("Granted: $0 / $1K");
    expect(moneyGrantedElementsInOrderOfAppearance[1]).toHaveTextContent("Granted: $999 / $1K");
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
