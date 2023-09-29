import { ComponentProps } from "react";
import { GithubPullRequestStatus } from "src/__generated/graphql";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { GithubContributionType } from "src/types";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [GithubPullRequestStatus.Open, GithubPullRequestStatus.Merged, GithubPullRequestStatus.Closed],
    },
    type: {
      control: { type: "select" },
      options: [GithubContributionType.PullRequest, GithubContributionType.Issue, GithubContributionType.CodeReview],
    },
    draft: "boolean",
    external: "boolean",
  },
};

const defaultProps: ComponentProps<typeof ContributionBadge> = {
  id: "123",
  number: 123,
  status: GithubPullRequestStatus.Open,
  type: GithubContributionType.PullRequest,
  title: "Contribution Badge",
  url: "",
  author: {
    avatarUrl: "#",
    login: "test-account",
    id: 123,
  },
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};
