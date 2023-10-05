import { GithubIssueStatus } from "src/__generated/graphql";
import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
} from "src/types";
import { getGithubStatusToken } from "./getGithubStatusToken";

describe("getGithubStatusToken", () => {
  it("should get the token for an open PR", () => {
    expect(getGithubStatusToken(GithubContributionType.PullRequest, GithubPullRequestStatus.Open)).toBe(
      "githubPullRequest.status.open"
    );
  });

  it("should get the token for a closed PR", () => {
    expect(getGithubStatusToken(GithubContributionType.PullRequest, GithubPullRequestStatus.Closed)).toBe(
      "githubPullRequest.status.closed"
    );
  });

  it("should get the token for a merged PR", () => {
    expect(getGithubStatusToken(GithubContributionType.PullRequest, GithubPullRequestStatus.Merged)).toBe(
      "githubPullRequest.status.merged"
    );
  });

  it("should get the token for a draft PR", () => {
    expect(getGithubStatusToken(GithubContributionType.PullRequest, GithubPullRequestDraft.Draft)).toBe(
      "githubPullRequest.status.open"
    );
  });

  it("should get the token for an open issue", () => {
    expect(getGithubStatusToken(GithubContributionType.Issue, GithubIssueStatus.Open)).toBe("githubIssue.status.open");
  });

  it("should get the token for a completed issue", () => {
    expect(getGithubStatusToken(GithubContributionType.Issue, GithubIssueStatus.Completed)).toBe(
      "githubIssue.status.closed"
    );
  });

  it("should get the token for a closed issue", () => {
    expect(getGithubStatusToken(GithubContributionType.Issue, GithubIssueStatus.Cancelled)).toBe(
      "githubIssue.status.closed"
    );
  });

  it("should get the token for a pending code review", () => {
    expect(getGithubStatusToken(GithubContributionType.CodeReview, GithubCodeReviewStatus.Pending)).toBe(
      "githubCodeReview.status.pending"
    );
  });

  it("should get the token for an approved code review", () => {
    expect(getGithubStatusToken(GithubContributionType.CodeReview, GithubCodeReviewStatus.Completed)).toBe(
      "githubCodeReview.status.approved"
    );
  });

  it("should get the token for a rejected code review", () => {
    expect(getGithubStatusToken(GithubContributionType.CodeReview, GithubCodeReviewStatus.ChangeRequested)).toBe(
      "githubCodeReview.status.changeRequested"
    );
  });
});
