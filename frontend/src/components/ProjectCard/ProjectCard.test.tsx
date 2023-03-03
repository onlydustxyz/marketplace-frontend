import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectCard from ".";
import { screen } from "@testing-library/react";
import { Project } from "src/pages/Projects";
import {
  ContributorIdFragment,
  ProjectCardGithubRepoFieldsFragment,
  ProjectContributorsFragment,
} from "src/__generated/graphql";
import { ArrayElement } from "src/types";

const contributor1: ContributorIdFragment = {
  __typename: "User",
  id: 123456,
};

const contributor2: ContributorIdFragment = {
  __typename: "User",
  id: 123457,
};

const contributor3: ContributorIdFragment = {
  __typename: "User",
  id: 123458,
};

const githubRepo1: ProjectCardGithubRepoFieldsFragment & ArrayElement<ProjectContributorsFragment["githubRepos"]> = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 1000,
  githubRepoDetails: {
    id: 1000,
    languages: { Cairo: 1000, Rust: 100, HTML: 150 },
    content: {
      id: 1000,
      contributors: [contributor1, contributor2],
    },
  },
};

const githubRepo2: ProjectCardGithubRepoFieldsFragment & ArrayElement<ProjectContributorsFragment["githubRepos"]> = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 1001,
  githubRepoDetails: {
    id: 1001,
    languages: { Rust: 80, Go: 40, Cairo: 2000 },
    content: {
      id: 1001,
      contributors: [contributor1, contributor3],
    },
  },
};

const PROJECT: Project = {
  id: 123,
  projectDetails: {
    projectId: "123",
    name: "ZeroSync",
    telegramLink: "https://app.onlydust.xyz/projects/92f022a9-dbd8-446f-a2a5-b161ccb4541c",
    shortDescription: "A short description",
    logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
  },
  projectLeads: [
    {
      userId: "user-1",
      user: {
        id: "user-1",
        displayName: "oscarwroche",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
      },
    },
  ],
  githubRepos: [githubRepo1, githubRepo2],
  budgetsAggregate: {
    aggregate: {
      sum: {
        spentAmount: 47550,
      },
    },
  },
  budgets: [{ id: "budget-1", paymentRequests: [] }],
  pendingInvitations: [{ id: "croute" }],
  projectSponsors: [
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
    renderWithIntl(<ProjectCard {...PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const sponsorsLogo = screen.getByTestId(`sponsor-list-${PROJECT.id}`).getElementsByTagName("img");
    expect(sponsorsLogo).toHaveLength(2);
  });

  it("should display at most 3 sponsors logos", () => {
    renderWithIntl(
      <ProjectCard {...PROJECT} projectSponsors={[...PROJECT.projectSponsors, ...PROJECT.projectSponsors]} />,
      {
        wrapper: MemoryRouterProviderFactory({}),
      }
    );

    const sponsorsLogo = screen.getByTestId(`sponsor-list-${PROJECT.id}`).getElementsByTagName("img");
    expect(sponsorsLogo).toHaveLength(3);
  });

  it("should display the repository count", () => {
    renderWithIntl(<ProjectCard {...PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const repositoryCountString = screen.getByTestId(`github-repo-count-${PROJECT.id}`);
    expect(repositoryCountString.textContent).toContain("2 repositories");
  });

  it("should display the contributor count", () => {
    renderWithIntl(<ProjectCard {...PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const contributorCountString = screen.getByTestId(`contributor-count-${PROJECT.id}`);
    expect(contributorCountString.textContent).toContain("3 contributors");
  });

  it("should display the languages", () => {
    renderWithIntl(<ProjectCard {...PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const languagesString = screen.getByTestId(`languages-${PROJECT.id}`);
    expect(languagesString.textContent).toContain("cairo, rust");
  });
});
