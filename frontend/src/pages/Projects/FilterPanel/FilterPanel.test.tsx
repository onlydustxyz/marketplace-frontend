import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import FilterPanel from ".";
import { renderWithIntl, MemoryRouterProviderFactory } from "src/test/utils";
import { GetAllFilterOptionsDocument, GetAllFilterOptionsQuery } from "src/__generated/graphql";
import { MockedResponse } from "@apollo/client/testing";
import { MockedProjectFilterProvider } from "src/pages/Projects/useProjectFilter";

expect.extend(matchers);

const projects1: GetAllFilterOptionsQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-1",
  key: "project-1",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      projectId: "project-1",
      githubRepoId: 1,
      repo: {
        __typename: "GithubRepos",
        id: 1,
        languages: { "C++": 1234, Shell: 123, Makefile: 10 },
      },
    },
  ],
  sponsors: [{ sponsor: { id: "sponsor-1", name: "Sponsor 1" } }],
  budgetsAggregate: { aggregate: { count: 1 } },
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  visibility: "public",
};

const projects2: GetAllFilterOptionsQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-2",
  key: "project-2",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: 2,
      projectId: "project-2",
      repo: {
        __typename: "GithubRepos",
        id: 2,
        languages: { Rust: 1234, Shell: 123 },
      },
    },
  ],
  sponsors: [{ sponsor: { id: "sponsor-1", name: "Sponsor 1" } }, { sponsor: { id: "sponsor-2", name: "Sponsor 2" } }],
  budgetsAggregate: { aggregate: { count: 1 } },
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  visibility: "public",
};

const projects3: GetAllFilterOptionsQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-3",
  key: "project-3",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      projectId: "project-3",
      githubRepoId: 3,
      repo: {
        __typename: "GithubRepos",
        id: 3,
        languages: { TypeScript: 1234 },
      },
    },
  ],
  sponsors: [],
  budgetsAggregate: { aggregate: { count: 1 } },
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  visibility: "public",
};

const projects4: GetAllFilterOptionsQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-4",
  key: "project-4",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      projectId: "project-4",
      githubRepoId: 4,
      repo: {
        __typename: "GithubRepos",

        id: 4,
        languages: { Go: 5555, C: 123 },
      },
    },
  ],
  sponsors: [],
  budgetsAggregate: { aggregate: { count: 1 } },
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  visibility: "public",
};

const projects5: GetAllFilterOptionsQuery["projects"][number] = {
  __typename: "Projects",
  id: "project-5",
  key: "project-5",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      projectId: "project-5",
      githubRepoId: 5,
      repo: {
        __typename: "GithubRepos",
        id: 5,
        languages: { Elisp: 666 },
      },
    },
  ],
  budgetsAggregate: { aggregate: { count: 0 } },
  sponsors: [{ sponsor: { id: "sponsor-3", name: "Sponsor 3" } }],
  projectLeads: [{ __typename: "ProjectLeads", userId: "user-1" }],
  pendingInvitations: [],
  contributors: [],
  githubReposAggregate: { aggregate: { count: 1 } },
  visibility: "public",
};

const graphQlMocks = [
  {
    request: {
      query: GetAllFilterOptionsDocument,
    },
    result: {
      data: {
        projects: [projects1, projects2, projects3, projects4, projects5],
      },
    },
  },
];

const render = (isProjectLeader: boolean, { isCleared, mocks }: { isCleared?: boolean; mocks: MockedResponse[] }) =>
  renderWithIntl(
    <MockedProjectFilterProvider isCleared={isCleared}>
      <FilterPanel isProjectLeader={isProjectLeader} />
    </MockedProjectFilterProvider>,
    {
      wrapper: MemoryRouterProviderFactory({ mocks }),
    }
  );

describe("FilterPanel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should display first 3 technologies of projects, all sponsors, and be sorted", async () => {
    render(false, { mocks: graphQlMocks });

    const allOptions = await screen.findAllByRole("option");
    expect(allOptions.length).toBe(7);
    expect(allOptions[0]).toHaveTextContent("C");
    expect(allOptions[1]).toHaveTextContent("C++");
    expect(allOptions[2]).toHaveTextContent("Go");
    expect(allOptions[3]).toHaveTextContent("Rust");
    expect(allOptions[4]).toHaveTextContent("TypeScript");
    expect(allOptions[5]).toHaveTextContent("Sponsor 1");
    expect(allOptions[6]).toHaveTextContent("Sponsor 2");
  });

  it("should display 'Mine only' when user is leader'", async () => {
    render(true, { mocks: graphQlMocks });

    await screen.findByText(/all projects/i);
    await screen.findByText(/mine only/i);
  });

  it("should not display technologies or sponsors from projects that aren't visible", async () => {
    render(true, { mocks: graphQlMocks });

    await screen.findByText(/go/i);
    expect(screen.queryByText(/elisp/i)).toBeNull();
    expect(screen.queryByText(/sponsor 3/i)).toBeNull();
  });

  test.each([true, false])("should not display clear all button if filter is cleared", async isProjectFilterCleared => {
    render(true, { isCleared: isProjectFilterCleared, mocks: graphQlMocks });

    if (isProjectFilterCleared) {
      expect(screen.queryByText(/clear all/i)).not.toBeInTheDocument();
    } else {
      expect(screen.queryByText(/clear all/i)).toBeInTheDocument();
    }
  });
});
