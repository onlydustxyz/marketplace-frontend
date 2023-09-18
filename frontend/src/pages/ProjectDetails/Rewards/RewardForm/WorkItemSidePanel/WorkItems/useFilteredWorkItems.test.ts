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
    githubPullRequest: null,
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

  // it("should be filtered by title", () => {
  //   const filteredWorkItems = useFilteredWorkItems({ pattern: "456", contributions: workItems });
  //   expect(filteredWorkItems).toHaveLength(1);
  //   expect(filteredWorkItems[0].id).toEqual("456");
  // });

  // it("should be filtered with logical AND", () => {
  //   const filteredWorkItems = useFilteredWorkItems({ pattern: "foo 5", contributions: workItems });
  //   expect(filteredWorkItems).toHaveLength(1);
  //   expect(filteredWorkItems[0].id).toEqual("3");
  // });
});
