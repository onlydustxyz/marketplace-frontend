import { GithubIssueStatus } from "src/__generated/graphql";
import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
  GithubStatus,
  GithubTypeStatusDict,
} from "src/types";

const tokens: GithubTypeStatusDict<string> = {
  [GithubContributionType.PullRequest]: {
    [GithubPullRequestStatus.Open]: "githubPullRequest.status.open",
    [GithubPullRequestStatus.Closed]: "githubPullRequest.status.closed",
    [GithubPullRequestStatus.Merged]: "githubPullRequest.status.merged",
    [GithubPullRequestDraft.Draft]: "githubPullRequest.status.open",
    [GithubPullRequestStatus.Completed]: "githubPullRequest.status.completed",
    [GithubPullRequestStatus.Cancelled]: "githubPullRequest.status.canceled",
  },
  [GithubContributionType.Issue]: {
    [GithubIssueStatus.Open]: "githubIssue.status.open",
    [GithubIssueStatus.Completed]: "githubIssue.status.completed",
    [GithubIssueStatus.Cancelled]: "githubIssue.status.canceled",
  },
  [GithubContributionType.CodeReview]: {
    [GithubCodeReviewStatus.Open]: "githubCodeReview.status.open",
    [GithubCodeReviewStatus.Approved]: "githubCodeReview.status.approved",
    [GithubCodeReviewStatus.ChangeRequested]: "githubCodeReview.status.changeRequested",
    [GithubCodeReviewStatus.Commented]: "githubCodeReview.status.commented",
    [GithubCodeReviewStatus.Completed]: "githubCodeReview.status.completed",
    [GithubCodeReviewStatus.Cancelled]: "githubCodeReview.status.canceled",
    [GithubCodeReviewStatus.Dismissed]: "githubCodeReview.status.dismissed",
    [GithubCodeReviewStatus.Pending]: "githubCodeReview.status.pending",
  },
};

export function getGithubStatusToken(type: GithubContributionType, status: GithubStatus): string {
  return tokens[type]?.[status as keyof typeof tokens[GithubContributionType]] ?? "";
}
