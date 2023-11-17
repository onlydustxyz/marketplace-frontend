import { OrganizationSessionStorageInterface } from "src/types";
import { getSelectedRepoIds } from "./ProjectInformations.utils";

describe("getSelectedRepoIds", () => {
  it("should return an empty array when no organizations are provided", () => {
    expect(getSelectedRepoIds([])).toEqual([]);
  });

  it("should return an empty array when no repos are selected", () => {
    const orgs = [
      {
        id: 1,
        organization: {
          installationId: 123456,
          installed: true,
          avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
          htmlUrl: "https://github.com/onlydustxyz",
          id: 595505,
          login: "onlydustxyz",
          name: "OnlyDust",
          repos: [
            {
              id: 650626566,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
            },
          ],
        },
      },
    ];

    console.log(getSelectedRepoIds(orgs));
    expect(getSelectedRepoIds(orgs)).toEqual([]);
  });

  it("should return only the IDs of selected repos", () => {
    const orgs = [
      {
        id: 1,
        organization: {
          installationId: 123456,
          installed: true,
          avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
          htmlUrl: "https://github.com/onlydustxyz",
          id: 595505,
          login: "onlydustxyz",
          name: "OnlyDust",
          repos: [
            {
              id: 650626566,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: false,
            },
            {
              id: 650626567,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: true,
            },
          ],
        },
      },
    ];
    expect(getSelectedRepoIds(orgs)).toEqual([650626567]);
  });

  it("should ignore repos without a githubId", () => {
    const orgs = [
      {
        id: 1,
        organization: {
          installationId: 123456,
          installed: true,
          avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
          htmlUrl: "https://github.com/onlydustxyz",
          id: 595505,
          login: "onlydustxyz",
          name: "OnlyDust",
          repos: [
            {
              id: 650626566,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: true,
            },
            {
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: true,
            },
          ],
        },
      },
    ];
    expect(getSelectedRepoIds(orgs as unknown as OrganizationSessionStorageInterface[])).toEqual([650626566]);
  });

  it("should handle multiple organizations", () => {
    const orgs = [
      {
        id: 1,
        organization: {
          installationId: 123,
          installed: true,
          avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
          htmlUrl: "https://github.com/onlydustxyz",
          id: 595505,
          login: "onlydustxyz",
          name: "OnlyDust",
          repos: [
            {
              id: 650626566,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: false,
            },
            {
              id: 650626567,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: true,
            },
          ],
        },
      },
      {
        id: 2,
        organization: {
          installationId: 456,
          installed: true,
          avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
          htmlUrl: "https://github.com/onlydustxyz",
          id: 595505,
          login: "onlydustxyz",
          name: "OnlyDust",
          repos: [
            {
              id: 650626568,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: false,
            },
            {
              id: 650626569,
              htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
              name: "marketplace-backend",
              owner: "onlydustxyz",
              selected: true,
            },
          ],
        },
      },
    ];
    expect(getSelectedRepoIds(orgs as unknown as OrganizationSessionStorageInterface[])).toEqual([650626566]);
  });
});
