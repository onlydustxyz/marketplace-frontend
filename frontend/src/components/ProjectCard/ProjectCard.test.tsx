import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectCard from ".";
import { screen } from "@testing-library/react";
import { Project } from "src/pages/Projects";

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
      user: {
        displayName: "oscarwroche",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
      },
    },
  ],
  githubRepo: {
    id: 12345,
    owner: "facebook",
    name: "react",
    content: {
      id: 12345,
      contributors: [
        { login: "oscarwroche", avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4" },
        { login: "ofux", avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4" },
      ],
      logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
    },
    languages: { Ejs: 2200, Rust: 1000 },
  },
  budgetsAggregate: {
    aggregate: {
      sum: {
        spentAmount: 47550,
      },
    },
  },
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
});
