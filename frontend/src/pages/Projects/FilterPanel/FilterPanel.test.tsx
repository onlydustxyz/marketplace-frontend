import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import FilterPanel, { GET_ALL_TECHNOLOGIES_QUERY } from ".";
import { renderWithIntl, MemoryRouterProviderFactory } from "src/test/utils";
import { ProjectOwnershipType } from "..";
import { GithubRepoLanguagesFieldsFragment } from "src/__generated/graphql";

expect.extend(matchers);

const githubRepo1: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 1,
  githubRepoDetails: {
    id: 1,
    languages: { "C++": 1234, Shell: 123, Makefile: 10 },
  },
};

const githubRepo2: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 2,
  githubRepoDetails: {
    id: 2,
    languages: { Rust: 1234, Shell: 123 },
  },
};

const githubRepo3: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 3,
  githubRepoDetails: {
    id: 3,
    languages: { TypeScript: 1234 },
  },
};

const githubRepo4: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 4,
  githubRepoDetails: {
    id: 4,
    languages: { Go: 5555, C: 123 },
  },
};

const githubRepo5: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 5,
  githubRepoDetails: {
    id: 5,
    languages: {},
  },
};

const graphQlMocks = [
  {
    request: {
      query: GET_ALL_TECHNOLOGIES_QUERY,
    },
    result: {
      data: {
        projects: [
          {
            id: "1",
            githubRepos: [githubRepo1],
          },
          {
            id: "2",
            githubRepos: [githubRepo2],
          },
          {
            id: "3",
            githubRepos: [githubRepo3, githubRepo4],
          },
          {
            id: "4",
            githubRepos: [githubRepo5],
          },
        ],
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
    expect(allOptions.length).toBe(5);
    expect(allOptions[0]).toHaveTextContent("C++");
    expect(allOptions[1]).toHaveTextContent("Go");
    expect(allOptions[2]).toHaveTextContent("Rust");
    expect(allOptions[3]).toHaveTextContent("Shell");
    expect(allOptions[4]).toHaveTextContent("TypeScript");
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
});
