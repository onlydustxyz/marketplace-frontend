import { filter } from "lodash";
import { ContributionFragment, GithubIssueStatus, GithubPullRequestStatus } from "src/__generated/graphql";
import { GithubCodeReviewStatus } from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import { GithubContributionType } from "src/types";

const filters = {
  [GithubContributionType.Issue]: { githubIssue: { status: GithubIssueStatus.Completed } },
  [GithubContributionType.PullRequest]: { githubPullRequest: { status: GithubPullRequestStatus.Merged } },
  [GithubContributionType.CodeReview]: { githubCodeReview: { status: GithubCodeReviewStatus.Completed } },
};

export const filterUnpaidContributions = (contributions: ContributionFragment[]): ContributionFragment[] => {
  return contributions.filter(({ ignored, githubIssue, githubPullRequest, githubCodeReview }) => {
    const allTypes =
      githubIssue?.status === GithubIssueStatus.Completed ||
      githubPullRequest?.status === GithubPullRequestStatus.Merged ||
      githubCodeReview?.status === GithubCodeReviewStatus.Completed;

    return !ignored && allTypes;
  });
};

export const filterUnpaidContributionsByType = (
  type: GithubContributionType,
  contributions: ContributionFragment[]
): ContributionFragment[] => {
  return filter(contributions, {
    ...filters[type],
    ignored: false,
  }) as ContributionFragment[];
};
