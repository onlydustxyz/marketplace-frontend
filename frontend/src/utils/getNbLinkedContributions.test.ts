import { getNbLinkedContributions } from "./getNbLinkedContributions";

const mockContribution = {
  githubPullRequest: {
    closingIssues: [
      {
        htmlUrl: "https://github.com/haydencleary/test/issues/12",
        id: 1914855057,
        number: 12,
        status: "OPEN",
        title: "mega bug",
        author: {
          avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
          login: "haydencleary",
          id: 5160414,
        },
      },
    ],
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
  githubCodeReview: {
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
  githubIssue: {
    htmlUrl: "https://github.com/haydencleary/test/issues/1",
    id: 1908371254,
    number: 1,
    status: "OPEN",
    title: "New issue",
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
      login: "haydencleary",
      id: 5160414,
    },
    closedByPullRequests: [
      {
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
    ],
  },
};

describe("getNbLinkedContributions", () => {
  it("should calculate the total number of linked contributions", () => {
    const nbLinkedContributions = getNbLinkedContributions(
      mockContribution as unknown as Parameters<typeof getNbLinkedContributions>[0]
    );

    expect(nbLinkedContributions).toBe(4);
  });
});
