import { OrderBy } from "src/__generated/graphql";
import { QueryContribution } from "src/types";

export function sortContributionsByNumber(
  [a, b]: [QueryContribution, QueryContribution],
  order: OrderBy.Asc | OrderBy.Desc = OrderBy.Desc
) {
  const { githubPullRequest: githubPullRequestA, githubIssue: githubIssueA, githubCodeReview: githubCodeReviewA } = a;
  const numberA =
    githubPullRequestA?.number ?? githubIssueA?.number ?? githubCodeReviewA?.githubPullRequest?.number ?? 0;

  const { githubPullRequest: githubPullRequestB, githubIssue: githubIssueB, githubCodeReview: githubCodeReviewB } = b;
  const numberB =
    githubPullRequestB?.number ?? githubIssueB?.number ?? githubCodeReviewB?.githubPullRequest?.number ?? 0;

  return order === OrderBy.Asc ? (numberA > numberB ? 1 : -1) : numberA < numberB ? 1 : -1;
}
