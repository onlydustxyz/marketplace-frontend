import { describe, expect, it } from "vitest";

import { getOrgsWithUnauthorizedRepos } from "./getOrgsWithUnauthorizedRepos";

const mockProject: Parameters<typeof getOrgsWithUnauthorizedRepos>[0] = {
  id: "808442f1-e7f1-4ec8-87a1-fb68a25162a9",
  slug: "bug-fix-mickael",
  name: "Bug fix Mickael",
  createdAt: "2023-09-04T13:52:03.05Z",
  indexedAt: "2023-11-09T16:23:38.223Z",
  indexingComplete: true,
  shortDescription: "Lorem Ipsumdd Test",
  longDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...",
  logoUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/1a91a89934ce4b6e7bc7a859552d30a3.png",
  moreInfos: [
    {
      url: "www.onlydust.xyz",
      value: "onlydust",
    },
  ],
  hiring: false,
  visibility: "PUBLIC",
  contributorCount: 1,
  topContributors: [
    {
      githubUserId: 31901905,
      login: "kaelsky",
      avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
    },
  ],
  ecosystems: [],
  organizations: [
    {
      githubUserId: 98735558,
      login: "onlydustxyz",
      avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
      htmlUrl: "https://github.com/onlydustxyz",
      name: "OnlyDust",
      isCurrentUserAdmin: true,
      repos: [
        {
          id: 663102799,
          owner: "onlydustxyz",
          name: "od-rust-template",
          description: undefined,
          htmlUrl: "https://github.com/onlydustxyz/od-rust-template",
          stars: 0,
          forkCount: 0,
          hasIssues: true,
          isIncludedInProject: true,
          isAuthorizedInGithubApp: true,
        },
      ],
      installationStatus: "COMPLETE",
      installationId: 44133412,
    },
  ],
  leaders: [
    {
      githubUserId: 16590657,
      login: "PierreOucif",
      avatarUrl: "https://avatars.githubusercontent.com/u/16590657?v=4",
      id: "41b46107-9e4c-4e31-8acf-8371e4ca566a",
    },
    {
      githubUserId: 31901905,
      login: "kaelsky",
      avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
      id: "91422361-44aa-4286-9ed2-eb8b4c49d06d",
    },
    {
      githubUserId: 5160414,
      login: "haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
      id: "e90bf93b-baac-48d6-9189-54de46ea0d57",
    },
  ],
  programs: [],
  languages: [
    {
      id: "123",
      name: "Rust",
      logoUrl: "",
      slug: "rust",
    },
  ],
  hasRemainingBudget: true,
  rewardSettings: {
    ignorePullRequests: true,
    ignoreIssues: false,
    ignoreCodeReviews: false,
    ignoreContributionsBefore: "1970-01-01T00:00:00Z",
  },
  categories: [],
  goodFirstIssueCount: 0,
};

describe("getOrgsWithUnauthorizedRepos", () => {
  it("should return an empty array if project.organizations is undefined", () => {
    const project = { ...mockProject, organizations: undefined };
    const result = getOrgsWithUnauthorizedRepos(project);
    expect(result).toEqual([]);
  });

  it("should return an empty array if project.organizations is an empty array", () => {
    const project = { ...mockProject, organizations: [] };
    const result = getOrgsWithUnauthorizedRepos(project);
    expect(result).toEqual([]);
  });

  it("should return an empty array if all repos in project.organizations are authorized", () => {
    const result = getOrgsWithUnauthorizedRepos(mockProject);
    expect(result).toEqual([]);
  });

  it("should return an array of organizations with unauthorized repos", () => {
    const project = {
      ...mockProject,
      organizations: mockProject.organizations
        ? [
            {
              ...mockProject.organizations[0],
              repos: [
                {
                  ...mockProject.organizations?.[0].repos[0],
                  isAuthorizedInGithubApp: false,
                },
              ],
            },
          ]
        : [],
    };
    const result = getOrgsWithUnauthorizedRepos(project);
    expect(result).toEqual([project.organizations?.[0]]);
  });
});
