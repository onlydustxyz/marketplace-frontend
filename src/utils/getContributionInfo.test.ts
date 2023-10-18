import { getContributionInfo } from "./getContributionInfo";

const mockContributions = [
  {
    closedAt: null,
    createdAt: "2023-10-02T16:10:04",
    id: "7075110b1ef1000a659796915a21ffe881fa6d371f83ad4918329cb3a8853ecd",
    githubPullRequest: {
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      draft: true,
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1274",
      id: 1538281413,
      number: 1274,
      status: "OPEN",
      title: "Refactor/contributions review",

      closingIssues: [],
      codeReviews: [],
    },
    githubIssue: null,
    githubCodeReview: null,
    githubRepo: {
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
      name: "marketplace-frontend",
      id: 498695724,
    },
    project: {
      name: "OnlyDust",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      key: "onlydust",
    },
    status: "in_progress",
    type: "PULL_REQUEST",
    rewardItems: [],
  },

  {
    closedAt: null,
    createdAt: "2023-10-02T16:10:04",
    id: "7075110b1ef1000a659796915a21ffe881fa6d371f83ad4918329cb3a8853ecd",
    githubIssue: {
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      draft: true,
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1274",
      id: 1538281413,
      number: 1274,
      status: "OPEN",
      title: "Refactor/contributions issue",
      closingIssues: [],
      codeReviews: [],
    },
    githubPullRequest: null,
    githubCodeReview: null,
    githubRepo: {
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
      name: "marketplace-frontend",
      id: 498695724,
    },
    project: {
      name: "OnlyDust",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      key: "onlydust",
    },
    status: "in_progress",
    type: "ISSUE",
    rewardItems: [],
  },

  {
    closedAt: null,
    createdAt: "2023-10-02T12:10:16",
    id: "9adf2a4431b94cde9e79785474fdfe9391c130c6893b2f62ffca70985e620f3d",
    githubPullRequest: null,
    githubIssue: null,
    githubCodeReview: {
      id: "31be91138b6c7f427770b4c2c986b2b4735a4614ff7c0288d403620177abcf4b",
      outcome: null,
      reviewer: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      status: "PENDING",
      githubPullRequest: {
        author: {
          avatarUrl: "https://avatars.githubusercontent.com/u/31901905?v=4",
          login: "kaelsky",
          id: 31901905,
        },
        draft: false,
        htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1272",
        id: 1537907981,
        number: 1272,
        status: "MERGED",
        title: "ci: fix",
      },
    },
    githubRepo: {
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
      name: "marketplace-frontend",
      id: 498695724,
    },
    project: {
      name: "OnlyDust",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      id: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
      key: "onlydust",
    },
    status: "in_progress",
    type: "CODE_REVIEW",
    rewardItems: [],
  },
] as unknown as Parameters<typeof getContributionInfo>[0][];

describe("getContributionInfo", () => {
  it("should get pull request info", () => {
    const contributionInfo = getContributionInfo(mockContributions[0]);

    expect(contributionInfo).toStrictEqual({
      type: "PULL_REQUEST",
      title: "Refactor/contributions review",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1274",
      number: 1274,
      status: "DRAFT",
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      commentsCount: 0,
    });
  });

  it("should get issue info", () => {
    const contributionInfo = getContributionInfo(mockContributions[1]);

    expect(contributionInfo).toStrictEqual({
      type: "ISSUE",
      title: "Refactor/contributions issue",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1274",
      number: 1274,
      status: "OPEN",
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      commentsCount: 0,
    });
  });

  it("should get code review info", () => {
    const contributionInfo = getContributionInfo(mockContributions[2]);

    expect(contributionInfo).toStrictEqual({
      type: "CODE_REVIEW",
      title: "ci: fix",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1272",
      number: 1272,
      status: "PENDING",
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
        login: "haydencleary",
        id: 5160414,
      },
      commentsCount: 0,
    });
  });
});
