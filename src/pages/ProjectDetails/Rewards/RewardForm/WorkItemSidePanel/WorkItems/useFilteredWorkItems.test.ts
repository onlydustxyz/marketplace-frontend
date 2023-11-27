import useFilteredWorkItems from "./useFilteredWorkItems";
import { GithubPullRequestStatus } from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import { RewardableItem } from "src/api/Project/queries";

const workItems: RewardableItem[] = [
  {
    number: 123,
    id: "123",
    contributionId: "c4d0054d149e151439a28934aa83c62f46510cee1f36ec65be4cf8a15d7c0f4b",
    title: "My pull Request",
    githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1419",
    createdAt: "2023-11-21T10:47:22Z",
    lastUpdateAt: "2023-11-21T10:47:47Z",
    repoName: "marketplace-frontend",
    type: "PULL_REQUEST",
    commitsCount: 1,
    userCommitsCount: 1,
    commentsCount: 0,
    status: GithubPullRequestStatus.Merged,
    ignored: false,
    htmlUrl: "",
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
    }) as RewardableItem[];
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].id).toEqual("123");
  });

  it("should be filtered by title", () => {
    const filteredWorkItems = useFilteredWorkItems({
      pattern: "My pull Request",
      contributions: workItems,
    }) as RewardableItem[];
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].title).toEqual("My pull Request");
  });

  it("should be filtered with logical AND", () => {
    const filteredWorkItems = useFilteredWorkItems({
      pattern: "My pull 123",
      contributions: workItems,
    }) as RewardableItem[];
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].id).toEqual("123");
  });
});
