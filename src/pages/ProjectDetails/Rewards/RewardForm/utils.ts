import { filter } from "lodash";
import { ContributionFragment, GithubIssueStatus } from "src/__generated/graphql";
import { GithubCodeReviewStatus } from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import { GithubPullRequestStatus } from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import { GithubContributionType } from "src/types";

const filters = {
  [GithubContributionType.Issue]: { githubIssue: { status: GithubIssueStatus.Completed } },
  [GithubContributionType.PullRequest]: { githubPullRequest: { status: GithubPullRequestStatus.Merged } },
  [GithubContributionType.CodeReview]: { githubCodeReview: { status: GithubCodeReviewStatus.Completed } },
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
