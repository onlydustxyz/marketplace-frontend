import { ComponentProps } from "react";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { GithubContributionIconStatus, GithubContributionType } from "src/types";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        GithubContributionIconStatus.Open,
        GithubContributionIconStatus.Merged,
        GithubContributionIconStatus.Closed,
      ],
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
  status: GithubContributionIconStatus.Open,
  type: GithubContributionType.PullRequest,
  title: "Contribution Badge",
  url: "",
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};
