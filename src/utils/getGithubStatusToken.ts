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
  },
  [GithubContributionType.Issue]: {
    [GithubIssueStatus.Open]: "githubIssue.status.open",
    [GithubIssueStatus.Completed]: "githubIssue.status.closed",
    [GithubIssueStatus.Cancelled]: "githubIssue.status.closed",
  },
  [GithubContributionType.CodeReview]: {
    [GithubCodeReviewStatus.Approved]: "githubCodeReview.status.approved",
    [GithubCodeReviewStatus.ChangeRequested]: "githubCodeReview.status.changeRequested",
    [GithubCodeReviewStatus.Commented]: "githubCodeReview.status.commented",
    [GithubCodeReviewStatus.Completed]: "githubCodeReview.status.approved",
    [GithubCodeReviewStatus.Dismissed]: "githubCodeReview.status.dismissed",
    [GithubCodeReviewStatus.Pending]: "githubCodeReview.status.pending",
  },
};

export function getGithubStatusToken(type: GithubContributionType, status: GithubStatus): string {
  return tokens[type]?.[status as keyof typeof tokens[GithubContributionType]] ?? "";
}
