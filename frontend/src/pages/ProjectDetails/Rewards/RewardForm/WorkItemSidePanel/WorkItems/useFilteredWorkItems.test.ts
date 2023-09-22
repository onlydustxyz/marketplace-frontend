import { ContributionFragment, GithubPullRequestStatus, WorkItemType } from "src/__generated/graphql";
import useFilteredWorkItems from "./useFilteredWorkItems";

const workItems: ContributionFragment[] = [
  {
    id: "123",
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Merged,
    repoId: 1,
    ignored: false,
    projectId: 123,
    detailsId: "00000",
    githubUserId: "123456",
    githubIssue: null,
    githubCodeReview: null,
    githubPullRequest: {
      number: 123,
      repoId: 12345678,
      title: "My pull Request",
      htmlUrl: "",
      status: GithubPullRequestStatus.Merged,
      createdAt: null,
      closedAt: null,
      mergedAt: null,
      id: "123",
      commitsCount: { aggregate: { count: 0 } },
      userCommitsCount: { aggregate: { count: 0 } },
      contributorDetails: [
        {
          author: {
            login: "ofux",
            avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
            htmlUrl: "https://github.com/ofux",
            id: 595505,
            user: { id: 233 },
          },
        },
      ],
      author: {
        login: "stannislas",
        avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
        htmlUrl: "https://github.com/stanislas",
        id: 123,
        user: { id: 233 },
      },
    },
  },
  {
    id: "456",
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Merged,
    repoId: 1,
    ignored: false,
    projectId: 456,
    detailsId: "00000",
    githubUserId: "123456",
    githubIssue: null,
    githubPullRequest: null,
    githubCodeReview: null,
  },
  {
    id: "789",
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Merged,
    repoId: 1,
    ignored: false,
    projectId: 789,
    detailsId: "00000",
    githubUserId: "123456",
    githubIssue: null,
    githubPullRequest: null,
    githubCodeReview: null,
  },
];

describe("Work items", () => {
  it("should not be filtered when pattern is empty", () => {
    const filteredWorkItems = useFilteredWorkItems({ contributions: workItems });
    expect(filteredWorkItems).toEqual(workItems);
  });

  it("should be filtered by number", () => {
    const filteredWorkItems = useFilteredWorkItems({
      pattern: "123",
      contributions: workItems,
    }) as ContributionFragment[];
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].id).toEqual("123");
  });

  it("should be filtered by title", () => {
    const filteredWorkItems = useFilteredWorkItems({
      pattern: "My pull Request",
      contributions: workItems,
    }) as ContributionFragment[];
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].githubPullRequest?.title).toEqual("My pull Request");
  });

  it("should be filtered with logical AND", () => {
    const filteredWorkItems = useFilteredWorkItems({
      pattern: "My pull 123",
      contributions: workItems,
    }) as ContributionFragment[];
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].id).toEqual("123");
  });
});
