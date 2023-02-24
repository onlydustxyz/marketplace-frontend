import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import AllProjects, { buildGetProjectsQuery } from ".";
import { ProjectOwnershipType } from "..";
import { CLAIMS_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { GetProjectsQueryResult } from "src/__generated/graphql";

expect.extend(matchers);

const TEST_PROJECT_ID = "2";

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
        },
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
            },
          },
        },
        pendingInvitations: [],
        projectLeads: [{ user: { displayName: "project lead", avatarUrl: "avatar" } }],
        projectSponsors: [],
        githubRepos: [
          {
            githubRepoId: 123456,
            githubRepoDetails: {
              id: 123456,
              owner: "owner",
              name: "name",
              languages: [],
              content: {
                id: 123456,
                contributors: [],
                logoUrl: "logo",
              },
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
        },
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 999,
            },
          },
        },
        pendingInvitations: [],
        githubRepos: [
          {
            githubRepoId: 123456,
            githubRepoDetails: {
              id: 123456,
              owner: "owner",
              name: "name",
              languages: [],
              content: {
                id: 123456,
                contributors: [],
                logoUrl: "logo",
              },
            },
          },
        ],
        projectLeads: [{ user: { displayName: "project lead", avatarUrl: "avatar" } }],
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
        },
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
            },
          },
        },
        pendingInvitations: [],
        githubRepos: [
          {
            githubRepoId: 123456,
            githubRepoDetails: {
              id: 123456,
              owner: "owner",
              name: "name",
              languages: [],
              content: {
                id: 123456,
                contributors: [],
                logoUrl: "logo",
              },
            },
          },
        ],
        projectLeads: [{ user: { displayName: "project lead", avatarUrl: "avatar" } }],
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
        },
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 999,
            },
          },
        },
        pendingInvitations: [],
        githubRepos: [
          {
            githubRepoId: 123456,
            githubRepoDetails: {
              id: 123456,
              owner: "owner",
              name: "name",
              languages: [],
              content: {
                id: 123456,
                contributors: [],
                logoUrl: "logo",
              },
            },
          },
        ],
        projectLeads: [{ user: { displayName: "project lead", avatarUrl: "avatar" } }],
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
        },
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 0,
            },
          },
        },
        pendingInvitations: [{ id: "invitation-1" }],
        githubRepos: [
          {
            githubRepoId: 123456,
            githubRepoDetails: {
              id: 123456,
              owner: "owner",
              name: "name",
              languages: [],
              content: {
                id: 123456,
                contributors: [],
                logoUrl: "logo",
              },
            },
          },
        ],
        projectLeads: [{ user: { displayName: "project lead", avatarUrl: "avatar" } }],
        projectSponsors: [],
      },
    ],
  },
};

const buildGraphQlMocks = (projectsQueryResult: { data: GetProjectsQueryResult["data"] }) => [
  {
    request: {
      query: buildGetProjectsQuery([]),
      variables: { languages: [] },
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
    post: (url: string, tokenSet?: TokenSet) => ({
      data: HASURA_TOKEN,
    }),
  },
}));

vi.mock("jwt-decode", () => ({
  default: (jwt: string) => {
    return {
      [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_PROJECT_ID}"}` },
    };
  },
}));

describe("All projects", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should sort by money granted desc if no pending invitations", async () => {
    renderWithIntl(<AllProjects technologies={[]} projectOwnershipType={ProjectOwnershipType.All} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_NO_INVITATIONS),
      }),
    });
    const moneyGrantedElementsInOrderOfAppearance = await screen.findAllByText("granted", { exact: false });
    expect(moneyGrantedElementsInOrderOfAppearance[0]).toHaveTextContent("$1,000");
    expect(moneyGrantedElementsInOrderOfAppearance[1]).toHaveTextContent("$999");
  });

  it("should sort by pending invitation, then money granted desc if pending invitations", async () => {
    renderWithIntl(<AllProjects technologies={[]} projectOwnershipType={ProjectOwnershipType.All} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_WITH_INVITATION),
      }),
    });
    const moneyGrantedElementsInOrderOfAppearance = await screen.findAllByText("granted", { exact: false });
    expect(moneyGrantedElementsInOrderOfAppearance[0]).toHaveTextContent("$0");
    expect(moneyGrantedElementsInOrderOfAppearance[1]).toHaveTextContent("$1,000");
    expect(moneyGrantedElementsInOrderOfAppearance[2]).toHaveTextContent("$999");
  });

  it("should only show projects led if project ownership type is 'mine'", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN));
    renderWithIntl(<AllProjects technologies={[]} projectOwnershipType={ProjectOwnershipType.Mine} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: buildGraphQlMocks(ALL_PROJECTS_RESULT_NO_INVITATIONS),
      }),
    });
    const moneyGrantedElementsInOrderOfAppearance = await screen.findAllByText("granted", { exact: false });
    expect(moneyGrantedElementsInOrderOfAppearance).toHaveLength(1);
    expect(moneyGrantedElementsInOrderOfAppearance[0]).toHaveTextContent("$999 granted");
  });
});
