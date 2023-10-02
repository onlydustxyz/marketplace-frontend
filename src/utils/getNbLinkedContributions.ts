import { QueryContribution } from "src/types";

export function getNbLinkedContributions(
  contribution: Pick<QueryContribution, "githubCodeReview" | "githubIssue" | "githubPullRequest">
) {
  const { githubCodeReview, githubIssue, githubPullRequest } = contribution;

  const codeReviewPullRequest = githubCodeReview?.githubPullRequest ? 1 : 0;
  const closedByPullRequests = githubIssue?.closedByPullRequests?.length ?? 0;
  const closingIssues = githubPullRequest?.closingIssues?.length ?? 0;
  const codeReviews = githubPullRequest?.codeReviews?.length ?? 0;

  return codeReviewPullRequest + closedByPullRequests + closingIssues + codeReviews;
}
