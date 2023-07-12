import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectCard, { Project } from ".";
import { screen } from "@testing-library/react";

const githubRepo1 = {
  githubRepoId: 1000,
  projectId: "123",
  repo: {
    id: 1000,
    languages: { Cairo: 1000, Rust: 100, HTML: 150 },
  },
};

const githubRepo2 = {
  githubRepoId: 1001,
  projectId: "123",
  repo: {
    id: 1001,
    languages: { Rust: 80, Go: 40, Cairo: 2000 },
  },
};

const PROJECT: Project = {
  id: 123,
  contributors: [],
  githubReposAggregate: { aggregate: { count: 2 } },
  contributorsAggregate: { aggregate: { count: 3 } },
  name: "ZeroSync",
  key: "zerosync",
  moreInfoLink: "https://app.onlydust.xyz/projects/92f022a9-dbd8-446f-a2a5-b161ccb4541c",
  shortDescription: "A short description",
  logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
  hiring: false,
  rank: 0,
  visibility: "public",
  projectLeads: [
    {
      userId: "user-1",
      projectId: "123",
      user: {
        id: "user-1",
        login: "oscarwroche",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
        githubUserId: 21149076,
      },
    },
  ],
  githubRepos: [
    { __typename: "ProjectGithubRepos", ...githubRepo1 },
    { __typename: "ProjectGithubRepos", ...githubRepo2 },
  ],
  budgetsAggregate: {
    aggregate: {
      count: 1,
    },
  },
  pendingInvitations: [{ id: "croute", githubUserId: "github-user-id" }],
  sponsors: [
    {
      sponsor: {
        id: 1,
        name: "Starknet",
        logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg",
        url: "https://starkware.co/starknet/",
      },
    },
    {
      sponsor: {
        id: 2,
        name: "Ethereum Foundation",
        logoUrl: "https://logotyp.us/files/ethereum-foundation.svg",
        url: "https://ethereum.org/en/foundation/",
      },
    },
  ],
};

describe("'ProjectCard' component", () => {
  it("should display the sponsors logos", () => {
    renderWithIntl(<ProjectCard project={PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const sponsorsLogo = screen.getByTestId(`sponsor-list-${PROJECT.id}`).getElementsByTagName("img");
    expect(sponsorsLogo).toHaveLength(2);
  });

  it("should display at most 3 sponsors logos", () => {
    renderWithIntl(<ProjectCard project={{ ...PROJECT, sponsors: [...PROJECT.sponsors, ...PROJECT.sponsors] }} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const sponsorsLogo = screen.getByTestId(`sponsor-list-${PROJECT.id}`).getElementsByTagName("img");
    expect(sponsorsLogo).toHaveLength(3);
  });

  it("should display the repository count", () => {
    renderWithIntl(<ProjectCard project={PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const repositoryCountString = screen.getByTestId(`github-repo-count-${PROJECT.id}`);
    expect(repositoryCountString.textContent).toContain("2 repositories");
  });

  it("should display the contributor count", () => {
    renderWithIntl(<ProjectCard project={PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const contributorCountString = screen.getByTestId(`contributor-count-${PROJECT.id}`);
    expect(contributorCountString.textContent).toContain("3 contributors");
  });

  it("should display the languages", () => {
    renderWithIntl(<ProjectCard project={PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const languagesString = screen.getByTestId(`languages-${PROJECT.id}`);
    expect(languagesString.textContent).toContain("cairo, rust, go");
  });
});
