import { screen } from "@testing-library/react";
import { components } from "src/__generated/api";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ProjectCard from ".";

const PROJECT: components["schemas"]["ProjectPageItemResponse"] = {
  id: "cdb45d97-13a6-4f71-8c8c-78917fc02649",
  slug: "performance-test-with-a-very-long-name",
  name: "Performance test with a very long name",
  shortDescription: "Do not create issue on this one as it is linked with real projects !",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/1409408835957028656.png",
  hiring: false,
  visibility: "PUBLIC",
  repoCount: 2,
  contributorCount: 3,
  leaders: [
    {
      githubUserId: 74653697,
      login: "AnthonyBuisset",
      htmlUrl: "",
      avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
      id: "adcb11a6-92cf-4a1e-bace-79f7bdbc54e7",
    },
    {
      githubUserId: 8642470,
      login: "ofux",
      htmlUrl: "",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      id: "bd365490-dd23-4a24-ad23-7853fbd853c2",
    },
  ],
  sponsors: [
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983041",
      name: "OnlyDust",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983042",
      name: "OnlyFast",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983043",
      name: "OnlyRust",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
  ],
  technologies: {
    Java: 1082,
    CPlusPlus: 22688656,
    CSS: 128024,
    C: 3655312,
    Scheme: 50648,
    CMake: 115552,
    ObjectiveCPlusPlus: 10994,
    QMake: 876,
    Makefile: 298032,
    M4: 435994,
    HTML: 285238,
    Sage: 118798,
    TypeScript: 42942,
    Dockerfile: 9068,
    Shell: 367042,
    CoffeeScript: 34960,
    CapnProto: 2512,
    JavaScript: 8236948,
    Assembly: 56732,
    Python: 6840986,
  },
  isInvitedAsProjectLead: false,
};

describe("'ProjectCard' component", () => {
  it("should display the sponsors logos", () => {
    renderWithIntl(<ProjectCard project={PROJECT} />, {
      wrapper: MemoryRouterProviderFactory({}),
    });

    const sponsorsLogo = screen.getByTestId(`sponsor-list-${PROJECT.id}`).getElementsByTagName("img");
    expect(sponsorsLogo).toHaveLength(3);
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
    expect(languagesString.textContent).toContain("cplusplus, javascript, python");
  });
});
