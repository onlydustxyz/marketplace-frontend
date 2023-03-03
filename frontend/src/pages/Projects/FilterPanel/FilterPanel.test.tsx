import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import FilterPanel, { GET_ALL_TECHNOLOGIES_QUERY } from ".";
import { renderWithIntl, MemoryRouterProviderFactory } from "src/test/utils";
import { ProjectOwnershipType } from "..";
import { GetAllTechnologiesQuery } from "src/__generated/graphql";

expect.extend(matchers);

const projects1: GetAllTechnologiesQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 1,
      githubRepoDetails: {
        __typename: "GithubRepoDetails",
        id: 1,
        languages: { "C++": 1234, Shell: 123, Makefile: 10 },
      },
    },
  ],
  budgets: [{ __typename: "Budgets", id: "budget-1" }],
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
};

const projects2: GetAllTechnologiesQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-2",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 2,
      githubRepoDetails: {
        __typename: "GithubRepoDetails",
        id: 2,
        languages: { Rust: 1234, Shell: 123 },
      },
    },
  ],
  budgets: [{ __typename: "Budgets", id: "budget-1" }],
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
};

const projects3: GetAllTechnologiesQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-3",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 3,
      githubRepoDetails: {
        __typename: "GithubRepoDetails",
        id: 3,
        languages: { TypeScript: 1234 },
      },
    },
  ],
  budgets: [{ __typename: "Budgets", id: "budget-1" }],
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
};

const projects4: GetAllTechnologiesQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-4",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 4,
      githubRepoDetails: {
        __typename: "GithubRepoDetails",

        id: 4,
        languages: { Go: 5555, C: 123 },
      },
    },
  ],
  budgets: [{ __typename: "Budgets", id: "budget-1" }],
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
};

const projects5: GetAllTechnologiesQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-5",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 5,
      githubRepoDetails: {
        __typename: "GithubRepoDetails",

        id: 5,
        languages: { Elisp: 666 },
      },
    },
  ],
  budgets: [],
  projectLeads: [
    {
      __typename: "ProjectLeads",
      userId: "user-1",
    },
  ],
  pendingInvitations: [],
};

const graphQlMocks = [
  {
    request: {
      query: GET_ALL_TECHNOLOGIES_QUERY,
    },
    result: {
      data: {
        projects: [projects1, projects2, projects3, projects4, projects5],
      },
    },
  },
];

describe("FilterPanel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should display first 2 technologies of projects and be sorted", async () => {
    renderWithIntl(
      <FilterPanel
        projectFilter={{ ownershipType: ProjectOwnershipType.All, technologies: [] }}
        setProjectFilter={() => {
          return;
        }}
        clearProjectFilter={Function.prototype()}
        isProjectLeader={false}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );

    const allOptions = await screen.findAllByRole("option");
    expect(allOptions.length).toBe(6);
    expect(allOptions[0]).toHaveTextContent("C");
    expect(allOptions[1]).toHaveTextContent("C++");
    expect(allOptions[2]).toHaveTextContent("Go");
    expect(allOptions[3]).toHaveTextContent("Rust");
    expect(allOptions[4]).toHaveTextContent("Shell");
    expect(allOptions[5]).toHaveTextContent("TypeScript");
  });

  it("should display 'Mine only' when user is leader'", async () => {
    renderWithIntl(
      <FilterPanel
        projectFilter={{ ownershipType: ProjectOwnershipType.All, technologies: [] }}
        setProjectFilter={() => {
          return;
        }}
        clearProjectFilter={Function.prototype()}
        isProjectLeader={true}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );

    await screen.findByText(/all projects/i);
    await screen.findByText(/mine only/i);
  });

  it("should not display technologies from projects that aren't visible", async () => {
    renderWithIntl(
      <FilterPanel
        projectFilter={{ ownershipType: ProjectOwnershipType.All, technologies: [] }}
        setProjectFilter={() => {
          return;
        }}
        clearProjectFilter={Function.prototype()}
        isProjectLeader={true}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );
    await screen.findByText(/go/i);
    expect(screen.queryByText(/elisp/i)).toBeNull();
  });
});
