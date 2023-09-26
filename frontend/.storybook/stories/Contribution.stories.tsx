import { ComponentProps } from "react";

import { Contribution } from "src/components/Contribution/Contribution";
import { GithubContributionType, GithubContributionReviewStatus, GithubContributionIconStatus } from "src/types";

export default {
  title: "Contribution",
  component: Contribution,
  argTypes: {
    type: {
      control: { type: "select" },
      options: [GithubContributionType.PullRequest, GithubContributionType.Issue, GithubContributionType.CodeReview],
    },
    status: {
      control: { type: "select" },
      options: [
        GithubContributionIconStatus.Open,
        GithubContributionIconStatus.Merged,
        GithubContributionIconStatus.Closed,
        GithubContributionIconStatus.Draft,
      ],
    },
    review: {
      control: { type: "select" },
      options: [
        GithubContributionReviewStatus.PendingReviewer,
        GithubContributionReviewStatus.UnderReview,
        GithubContributionReviewStatus.Approved,
        GithubContributionReviewStatus.ChangesRequested,
      ],
    },
  },
};

const defaultProps: ComponentProps<typeof Contribution> = {
  title: "Name of PR / Issue / Other work ",
  url: "#",
  number: 123,
  type: GithubContributionType.PullRequest,
  status: GithubContributionIconStatus.Open,
  review: GithubContributionReviewStatus.PendingReviewer,
  rewards: [],
};

export const Default = {
  render: (args: typeof Contribution) => <Contribution {...defaultProps} {...args} />,
};
