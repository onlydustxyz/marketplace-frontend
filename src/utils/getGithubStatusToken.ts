import { GithubIssueStatus } from "src/__generated/graphql";
import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubItemStatus,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
  GithubTypeStatusDict,
} from "src/types";

const tokens: GithubTypeStatusDict<string> = {
  [GithubContributionType.PullRequest]: {
    [GithubPullRequestStatus.Open]: "githubPullRequest.status.open",
    [GithubPullRequestStatus.Closed]: "githubPullRequest.status.closed",
    [GithubPullRequestStatus.Merged]: "githubPullRequest.status.merged",
    [GithubPullRequestDraft.Draft]: "githubPullRequest.status.open",
    IN_PROGRESS: "githubPullRequest.status.open",
    COMPLETED: "githubPullRequest.status.merged",
    CANCELLED: "githubPullRequest.status.closed",
  },
  [GithubContributionType.Issue]: {
    [GithubIssueStatus.Open]: "githubIssue.status.open",
    [GithubIssueStatus.Completed]: "githubIssue.status.closed",
    [GithubIssueStatus.Cancelled]: "githubIssue.status.closed",
    IN_PROGRESS: "githubIssue.status.open",
  },
  [GithubContributionType.CodeReview]: {
    [GithubCodeReviewStatus.Pending]: "githubCodeReview.status.pending",
    [GithubCodeReviewStatus.Completed]: "githubCodeReview.status.approved",
    [GithubCodeReviewStatus.ChangeRequested]: "githubCodeReview.status.changeRequested",
    IN_PROGRESS: "githubCodeReview.status.pending",
    CANCELLED: "githubCodeReview.status.changeRequested",
  },
};

export function getGithubStatusToken(type: GithubContributionType, status: GithubItemStatus): string {
  return tokens[type]?.[status as keyof typeof tokens[GithubContributionType]] ?? "";
}
