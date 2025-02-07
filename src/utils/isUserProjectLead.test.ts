import { describe, expect, it } from "vitest";

import { components } from "src/__generated/api";

import { isUserProjectLead } from "./isUserProjectLead";

const project: components["schemas"]["ProjectPageItemResponse"] = {
  id: "b692a29f-4e4f-4607-aece-054f562b13cf",
  slug: "barbicane",
  name: "Barbicane",
  shortDescription: "Second best project ever",
  logoUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/fe377750576c5f2bf3657766052fb924.png",
  hiring: true,
  visibility: "PUBLIC",
  repoCount: 2,
  contributorCount: 1,
  leaders: [
    {
      githubUserId: 16590657,
      login: "PierreOucif",
      avatarUrl: "https://avatars.githubusercontent.com/u/16590657?v=4",
      id: "41b46107-9e4c-4e31-8acf-8371e4ca566a",
    },
    {
      githubUserId: 17259618,
      login: "alexbeno",
      avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
      id: "9d2e92fd-451d-45c3-840a-7fb2290d0e92",
    },
  ],
  ecosystems: [],
  languages: [
    {
      id: "123",
      name: "JavaScript",
      logoUrl: "",
      slug: "javascript",
    },
  ],
  hasMissingGithubAppInstallation: false,
};

describe("isUserProjectLead", () => {
  it("should return false if the githubUserId is undefined", () => {
    const githubUserId = undefined;
    const result = isUserProjectLead(project, githubUserId);
    expect(result).toBe(false);
  });

  it("should return true if the user is a project lead", () => {
    const githubUserId = 16590657;
    const result = isUserProjectLead(project, githubUserId);
    expect(result).toBe(true);
  });

  it("should return false if the user is not a project lead", () => {
    const githubUserId = 123;
    const result = isUserProjectLead(project, githubUserId);
    expect(result).toBe(false);
  });
});
