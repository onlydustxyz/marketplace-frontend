import { OrderBy } from "src/__generated/graphql";
import { sortContributionsByNumber } from "./sortContributionsByNumber";

const mockContributions: Parameters<typeof sortContributionsByNumber>[0][0][] = [
  {
    id: "652825ae108702f028ae4454bee3925c40c9a1b308a6d815d14ecbf50572e082",
    createdAt: "2023-09-18T16:41:40Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1242,
    githubStatus: "COMMENTED",
    githubTitle: "E 655 build my contributions list",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1242",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 5160414,
          login: "haydencleary",
          htmlUrl: "https://github.com/haydencleary",
          avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        },
        githubNumber: 1242,
        githubStatus: "MERGED",
        githubTitle: "E 655 build my contributions list",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1242",

        is_mine: true,
      },
    ],
    rewardIds: [],
  },
  {
    id: "2f2bcf7fd5359acd35d4598b01407df2f90696acefe748d4652d23b888ffc028",
    createdAt: "2023-09-19T18:02:29Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1246,
    githubStatus: "PENDING",
    githubTitle: "fix: contributions ui issues and search",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1246",
    githubBody:
      "### Problem \r\n\r\nhttps://onlydust.slack.com/archives/C05Q707EKU3/p1695107150106749\r\n\r\n### Solution \r\n\r\n- [x] Prevent displaying contributions <= 0\r\n- [x] Substract codeReviews from total \r\n- [x] Fix contributions count on mobile view\r\n- [x] Fix contributions count in contributors search \r\n- [x] Fix search filter in RewardFormSidePanel \r\n\r\n\r\n\r\n",
    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 31901905,
          login: "kaelsky",
          htmlUrl: "https://github.com/kaelsky",
          avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
        },
        githubNumber: 1246,
        githubStatus: "MERGED",
        githubTitle: "fix: contributions ui issues and search",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1246",
        githubBody:
          "### Problem \r\n\r\nhttps://onlydust.slack.com/archives/C05Q707EKU3/p1695107150106749\r\n\r\n### Solution \r\n\r\n- [x] Prevent displaying contributions <= 0\r\n- [x] Substract codeReviews from total \r\n- [x] Fix contributions count on mobile view\r\n- [x] Fix contributions count in contributors search \r\n- [x] Fix search filter in RewardFormSidePanel \r\n\r\n\r\n\r\n",
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "9adf2a4431b94cde9e79785474fdfe9391c130c6893b2f62ffca70985e620f3d",
    createdAt: "2023-10-02T14:10:16Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1272,
    githubStatus: "PENDING",
    githubTitle: "ci: fix",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1272",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 31901905,
          login: "kaelsky",
          htmlUrl: "https://github.com/kaelsky",
          avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
        },
        githubNumber: 1272,
        githubStatus: "MERGED",
        githubTitle: "ci: fix",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1272",

        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "65b40bb95bf739edd1e7d0309a6bdcbf9b293173f0bdaae4717a13877b0dcb23",
    createdAt: "2023-10-05T10:16:15Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1283,
    githubStatus: "PENDING",
    githubTitle: "feat: typo pr status",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1283",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 31901905,
          login: "kaelsky",
          htmlUrl: "https://github.com/kaelsky",
          avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
        },
        githubNumber: 1283,
        githubStatus: "MERGED",
        githubTitle: "feat: typo pr status",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1283",

        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "e31661281b32807398150b9a7275de278677611d952bb8e42b9d171f319f202d",
    createdAt: "2023-10-09T15:12:22Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1292,
    githubStatus: "PENDING",
    githubTitle: "[E 806] - Remove transparency from tooltip",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1292",
    githubBody:
      "~~[x] Rm  tooltip transparency~~ Fixed by https://github.com/onlydustxyz/marketplace-frontend/pull/1281\r\n[x] GMT date for contributors empty state\r\n[x] Update contributors table columns (full columns) ",
    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 31901905,
          login: "kaelsky",
          htmlUrl: "https://github.com/kaelsky",
          avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
        },
        githubNumber: 1292,
        githubStatus: "MERGED",
        githubTitle: "[E 806] - Remove transparency from tooltip",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1292",
        githubBody:
          "~~[x] Rm  tooltip transparency~~ Fixed by https://github.com/onlydustxyz/marketplace-frontend/pull/1281\r\n[x] GMT date for contributors empty state\r\n[x] Update contributors table columns (full columns) ",
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "4af9ea3389f483063249948e61d37fac9ecdae889f1809b0c501b41ff71d4fd6",
    createdAt: "2023-10-16T18:26:24Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1302,
    githubStatus: "PENDING",
    githubTitle: "Feat : project overview RESTfull",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1302",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 143011364,
          login: "pixelfact",
          htmlUrl: "https://github.com/pixelfact",
          avatarUrl: "https://avatars.githubusercontent.com/u/143011364?v=4",
        },
        githubNumber: 1302,
        githubStatus: "CLOSED",
        githubTitle: "Feat : project overview RESTfull",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1302",

        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "73a285adf5f1076a7259e7c97474e7f39271e7fce81f5d589d72a5eaba55808d",
    createdAt: "2023-10-18T16:36:46Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1304,
    githubStatus: "COMMENTED",
    githubTitle: "Fix/contribution bugs",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1304",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 5160414,
          login: "haydencleary",
          htmlUrl: "https://github.com/haydencleary",
          avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        },
        githubNumber: 1304,
        githubStatus: "MERGED",
        githubTitle: "Fix/contribution bugs",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1304",

        is_mine: true,
      },
    ],
    rewardIds: [],
  },
  {
    id: "179c2448aaeb665ac852a6c9ec0e6d24950431d24834b96c55683268ea9f60ee",
    createdAt: "2023-10-19T14:13:47Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1309,
    githubStatus: "PENDING",
    githubTitle: "Plug the project contributors list on the new api",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1309",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 143011364,
          login: "pixelfact",
          htmlUrl: "https://github.com/pixelfact",
          avatarUrl: "https://avatars.githubusercontent.com/u/143011364?v=4",
        },
        githubNumber: 1309,
        githubStatus: "MERGED",
        githubTitle: "Plug the project contributors list on the new api",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1309",

        is_mine: true,
      },
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 143011364,
          login: "pixelfact",
          htmlUrl: "https://github.com/pixelfact",
          avatarUrl: "https://avatars.githubusercontent.com/u/143011364?v=4",
        },
        githubNumber: 1309,
        githubStatus: "MERGED",
        githubTitle: "Plug the project contributors list on the new api",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1309",

        is_mine: false,
      },
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 143011364,
          login: "pixelfact",
          htmlUrl: "https://github.com/pixelfact",
          avatarUrl: "https://avatars.githubusercontent.com/u/143011364?v=4",
        },
        githubNumber: 1309,
        githubStatus: "MERGED",
        githubTitle: "Plug the project contributors list on the new api",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1309",

        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "a1d0f52b0b253e5f5800014d1b111a7b24708a0e7cc982daa9d06c0ffeca65af",
    createdAt: "2023-10-24T16:39:32Z",

    type: "ISSUE",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1316,
    githubStatus: "OPEN",
    githubTitle: "Test issue",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/issues/1316",
    githubBody: "Something is broken !",
    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [],
    rewardIds: ["669ee1d8-8c71-4ddb-913a-2d08a2711062"],
  },
  {
    id: "27cec5760d239cfe981719307d35cd98465d88f30b88777e99eb6a1e4d6bf01d",
    createdAt: "2023-10-25T15:57:45Z",

    type: "CODE_REVIEW",
    status: "IN_PROGRESS",
    repo: {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
    },
    githubAuthor: {
      githubUserId: 5160414,
      login: "haydencleary",
      htmlUrl: "https://github.com/haydencleary",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
    githubNumber: 1320,
    githubStatus: "PENDING",
    githubTitle:
      "E 697 update total earned on contributors profiles && E-696 Update project's contributors list && E-833 Caching issue in the contributors table.",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1320",

    project: {
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      slug: "onlydust",
      name: "OnlyDust",
      shortDescription: "Contribute to the best Open-Source projects",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      visibility: "PUBLIC",
    },
    links: [
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 17259618,
          login: "alexbeno",
          htmlUrl: "https://github.com/alexbeno",
          avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
        },
        githubNumber: 1320,
        githubStatus: "MERGED",
        githubTitle:
          "E 697 update total earned on contributors profiles && E-696 Update project's contributors list && E-833 Caching issue in the contributors table.",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1320",
        is_mine: false,
      },
      {
        type: "PULL_REQUEST",
        repo: {
          id: 498695724,
          owner: "onlydustxyz",
          name: "marketplace-frontend",
          htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
        },
        githubAuthor: {
          githubUserId: 17259618,
          login: "alexbeno",
          htmlUrl: "https://github.com/alexbeno",
          avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
        },
        githubNumber: 1320,
        githubStatus: "MERGED",
        githubTitle:
          "E 697 update total earned on contributors profiles && E-696 Update project's contributors list && E-833 Caching issue in the contributors table.",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1320",

        is_mine: false,
      },
    ],
    rewardIds: [],
  },
];

describe("sortContributionsByNumber", () => {
  it("should sort by ascending", () => {
    const sorted = mockContributions.sort((a, b) => sortContributionsByNumber([a, b], OrderBy.Asc));
    const numbers = sorted.map(({ githubNumber = 0 }) => githubNumber);

    expect(numbers).toEqual([1242, 1246, 1272, 1283, 1292, 1302, 1304, 1309, 1316, 1320]);
  });

  it("should sort by descending", () => {
    const sorted = mockContributions.sort((a, b) => sortContributionsByNumber([a, b], OrderBy.Desc));
    const numbers = sorted.map(({ githubNumber = 0 }) => githubNumber);

    expect(numbers).toEqual([1320, 1316, 1309, 1304, 1302, 1292, 1283, 1272, 1246, 1242]);
  });
});
