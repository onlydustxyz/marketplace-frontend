import { OrderBy } from "src/__generated/graphql";
import { QueryContribution } from "src/types";
import { sortContributionsByLinked } from "./sortContributionsByLinked";
import { getNbLinkedContributions } from "./getNbLinkedContributions";

const mockContributions: QueryContribution[] = [
  {
    closedAt: null,
    createdAt: "2023-09-26T13:36:51",
    id: "0ffe86e6371964f1839c4dd65ac3dccaac616fb7f9fd418fc660fc1143c10c1c",
    githubPullRequest: null,
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "CODE_REVIEW",
    rewardItems: [],
    githubCodeReview: {
      id: "68ccc74ff428bf2f9b66fdbdfc668754e096ccaa6f84b8056eeed73bc133ef48",
      outcome: null,
      status: "PENDING",
      reviewer: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      githubPullRequest: {
        author: {
          avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
          login: "kaelsky",
          id: 31901905,
        },
        draft: false,
        htmlUrl: "https://github.com/haydencleary/test/pull/11",
        id: 1530628417,
        number: 11,
        status: "OPEN",
        title: "doc: comment",
      },
    },
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-22T15:58:26",
    id: "f68671d3f426eda95718997447511cc54f6661b9a6ca62d3ed2be31bab901ee5",
    githubPullRequest: null,
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "CODE_REVIEW",
    rewardItems: [],
    githubCodeReview: {
      id: "56df1d185a2d966a374aaf966ac3a191628f01127fd8bb2ecec0a79401644642",
      outcome: null,
      status: "PENDING",
      reviewer: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      githubPullRequest: {
        author: {
          avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
          login: "haydencleary",
          id: 5160414,
        },
        draft: false,
        htmlUrl: "https://github.com/haydencleary/test/pull/8",
        id: 1526810441,
        number: 8,
        status: "OPEN",
        title: "feat: cool feature",
      },
    },
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-26T13:36:51",
    id: "342c75ca9ba8dc181e8ecbd710b715656ca1abfc22b24a64c0e620d823ce7df3",
    githubPullRequest: {
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
        login: "kaelsky",
        id: 31901905,
      },
      draft: false,
      htmlUrl: "https://github.com/haydencleary/test/pull/11",
      id: 1530628417,
      number: 11,
      status: "OPEN",
      title: "doc: comment",
      closingIssues: [],
      codeReviews: [
        {
          id: "68ccc74ff428bf2f9b66fdbdfc668754e096ccaa6f84b8056eeed73bc133ef48",
          outcome: null,
          reviewer: {
            avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            login: "haydencleary",
            id: 5160414,
          },
          status: "PENDING",
        },
      ],
    },
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "PULL_REQUEST",
    rewardItems: [],
    githubCodeReview: null,
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-22T15:58:26",
    id: "71138f882012513aabec10025e709842d5ae5f3467e218b94bef697bfa66153a",
    githubPullRequest: {
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      draft: false,
      htmlUrl: "https://github.com/haydencleary/test/pull/8",
      id: 1526810441,
      number: 8,
      status: "OPEN",
      title: "feat: cool feature",
      closingIssues: [],
      codeReviews: [
        {
          id: "5479ba16370883d09f5928dd4b1eb188ec5c9935112eac6f73bcd150344d6ee5",
          outcome: "change_requested",
          reviewer: {
            avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
            login: "kaelsky",
            id: 31901905,
          },
          status: "PENDING",
        },
        {
          id: "5479ba16370883d09f5928dd4b1eb188ec5c9935112eac6f73bcd150344d6ee53453245234543",
          outcome: "change_requested",
          reviewer: {
            avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
            login: "kaelsky",
            id: 31901905,
          },
          status: "PENDING",
        },
      ],
    },
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "PULL_REQUEST",
    rewardItems: [
      {
        paymentId: "05413939-dc82-4d55-8804-b5df29630bec",
      },
    ],
    githubCodeReview: null,
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-22T15:00:29",
    id: "11822e370c41256d4c704ce13d76592c479a4b91cdd36d64290e8bbe3eec4c25",
    githubPullRequest: {
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      draft: true,
      htmlUrl: "https://github.com/haydencleary/test/pull/5",
      id: 1526730940,
      number: 5,
      status: "OPEN",
      title: "Feat/contact",
      closingIssues: [],
      codeReviews: [],
    },
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "PULL_REQUEST",
    rewardItems: [],
    githubCodeReview: null,
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-22T14:59:24",
    id: "12b4bd8b36506edafd864c2cae6c4ee8107eaa7e880e90914072476808e72278",
    githubPullRequest: {
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      draft: false,
      htmlUrl: "https://github.com/haydencleary/test/pull/4",
      id: 1526729380,
      number: 4,
      status: "OPEN",
      title: "feat: homepage",
      closingIssues: [],
      codeReviews: [],
    },
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "PULL_REQUEST",
    rewardItems: [],
    githubCodeReview: null,
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-27T07:14:56",
    id: "8eae238bfbd09fbf34982b4af6153e2da2e2a7f7451d521e4c617f1bc471772e",
    githubPullRequest: null,
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "ISSUE",
    rewardItems: [],
    githubCodeReview: null,
    githubIssue: null,
  },
  {
    closedAt: null,
    createdAt: "2023-09-22T07:47:42",
    id: "8563c14e28c5e8aba019bd2adb97e026526d6dd387ea96cd72174eea19012b78",
    githubPullRequest: null,
    githubRepo: {
      htmlUrl: "https://github.com/haydencleary/test",
      name: "test",
      id: 694659372,
    },
    project: {
      name: "Test project",
      logoUrl: null,
      id: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      key: "test-project",
    },
    status: "in_progress",
    type: "ISSUE",
    rewardItems: [],
    githubCodeReview: null,
    githubIssue: null,
  },
];

describe("sortContributionsByLinked", () => {
  it("should sort by ascending", () => {
    const sorted = mockContributions.sort((a, b) => sortContributionsByLinked([a, b], OrderBy.Asc));

    const nbLinked = sorted.map(contribution => getNbLinkedContributions(contribution));

    expect(nbLinked).toEqual([0, 0, 0, 0, 1, 1, 1, 2]);
  });

  it("should sort by descending", () => {
    const sorted = mockContributions.sort((a, b) => sortContributionsByLinked([a, b], OrderBy.Desc));

    const nbLinked = sorted.map(contribution => getNbLinkedContributions(contribution));

    expect(nbLinked).toEqual([2, 1, 1, 1, 0, 0, 0, 0]);
  });
});
