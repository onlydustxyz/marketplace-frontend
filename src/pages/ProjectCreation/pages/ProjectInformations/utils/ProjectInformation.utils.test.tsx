import { getSelectedRepoIds } from "./ProjectInformations.utils";

describe("getSelectedRepoIds", () => {
  it("should return an empty array when no organizations are provided", () => {
    expect(getSelectedRepoIds([])).toEqual([]);
  });

  it("should return an empty array when no repos are selected", () => {
    const orgs = [
      {
        organization: {
          name: "org1",
          logoUrl: "https://avatars.githubusercontent.com/u/149416838?v=4",
          installationId: "43798605",
        },
        repos: [
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037274,
            selected: false,
          },
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037274,
            selected: false,
          },
        ],
      },
    ];
    expect(getSelectedRepoIds(orgs)).toEqual([]);
  });

  it("should return only the IDs of selected repos", () => {
    const orgs = [
      {
        organization: {
          name: "org1",
          logoUrl: "https://avatars.githubusercontent.com/u/149416838?v=4",
          installationId: "43798605",
        },
        repos: [
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037274,
            selected: true,
          },
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037274,
            selected: false,
          },
        ],
      },
    ];
    expect(getSelectedRepoIds(orgs)).toEqual([712037274]);
  });

  it("should ignore repos without a githubId", () => {
    const orgs = [
      {
        organization: {
          name: "org1",
          logoUrl: "https://avatars.githubusercontent.com/u/149416838?v=4",
          installationId: "43798605",
        },
        repos: [
          {
            name: "repo-name",
            shortDescription: "",
            selected: true,
          },
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037274,
            selected: true,
          },
        ],
      },
    ];
    expect(getSelectedRepoIds(orgs)).toEqual([712037274]);
  });

  it("should handle multiple organizations", () => {
    const orgs = [
      {
        organization: {
          name: "org1",
          logoUrl: "https://avatars.githubusercontent.com/u/149416838?v=4",
          installationId: "43798601",
        },
        repos: [
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037271,
            selected: false,
          },
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037272,
            selected: true,
          },
        ],
      },
      {
        organization: {
          name: "org2",
          logoUrl: "https://avatars.githubusercontent.com/u/149416838?v=4",
          installationId: "43798602",
        },
        repos: [
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037273,
            selected: true,
          },
          {
            name: "repo-name",
            shortDescription: "",
            githubId: 712037274,
            selected: false,
          },
        ],
      },
    ];
    expect(getSelectedRepoIds(orgs)).toEqual([712037272, 712037273]);
  });
});
