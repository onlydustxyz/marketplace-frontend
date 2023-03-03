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
  id: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: "github-repo-1",
      githubRepoDetails: {
        id: 1,
        languages: { "C++": 1234, Shell: 123, Makefile: 10 },
      },
    },
  ],
  budgets: [{ id: "budget-1" }],
  projectLeads: [{ userId: "user-1" }],
  pendingInvitations: [],
};

const projects2: GetAllTechnologiesQuery["projects"][number] = {
  id: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 2,
      githubRepoDetails: {
        id: 2,
        languages: { Rust: 1234, Shell: 123 },
      },
    },
  ],
  budgets: [{ id: "budget-1" }],
  projectLeads: [{ userId: "user-1" }],
  pendingInvitations: [],
};

const projects3: GetAllTechnologiesQuery["projects"][number] = {
  id: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 3,
      githubRepoDetails: {
        id: 3,
        languages: { TypeScript: 1234 },
      },
    },
  ],
  budgets: [{ id: "budget-1" }],
  projectLeads: [{ userId: "user-1" }],
  pendingInvitations: [],
};

const projects4: GetAllTechnologiesQuery["projects"][number] = {
  id: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 4,
      githubRepoDetails: {
        id: 4,
        languages: { Go: 5555, C: 123 },
      },
    },
  ],
  budgets: [{ id: "budget-1" }],
  projectLeads: [{ userId: "user-1" }],
  pendingInvitations: [],
};

const projects5: GetAllTechnologiesQuery["projects"][number] = {
  id: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 5,
      githubRepoDetails: {
        id: 5,
        languages: { Elisp: 666 },
      },
    },
  ],
  budgets: [],
  projectLeads: [{ userId: "user-1" }],
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
        isProjectLeader={false}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );

    userEvent.click(await screen.findByRole("button"));

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
