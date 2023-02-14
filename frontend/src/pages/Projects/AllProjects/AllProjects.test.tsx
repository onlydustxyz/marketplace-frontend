import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import AllProjects, { buildGetProjectsQuery } from ".";
import { ProjectOwnershipType } from "..";

expect.extend(matchers);

const ALL_PROJECTS_RESULT_NO_INVITATIONS = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: "1",
        name: "project1",
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
            },
          },
        },
        pendingInvitations: [],
      },
      {
        __typename: "Projects",
        id: "2",
        name: "project2",
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 999,
            },
          },
        },
        pendingInvitations: [],
      },
    ],
  },
};

const ALL_PROJECTS_RESULT_WITH_INVITATION = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: "1",
        name: "project1",
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 1000,
            },
          },
        },
        pendingInvitations: [],
      },
      {
        __typename: "Projects",
        id: "2",
        name: "project1",
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 999,
            },
          },
        },
        pendingInvitations: [],
      },
      {
        __typename: "Projects",
        id: "3",
        name: "project2",
        budgetsAggregate: {
          aggregate: {
            sum: {
              spentAmount: 0,
            },
          },
        },
        pendingInvitations: ["test"],
      },
    ],
  },
};

const buildGraphQlMocks = (projectsQueryResult: any) => [
  {
    request: {
      query: buildGetProjectsQuery([]),
      variables: { languages: [] },
    },
    result: projectsQueryResult,
  },
];

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

  it("should sort by pending invitation, then money granted desc if pendign invitations", async () => {
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
});
