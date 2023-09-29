import { ComponentProps } from "react";
import { GithubIssueStatus, GithubPullRequestStatus } from "src/__generated/graphql";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import { GithubCodeReviewStatus, GithubContributionType, GithubPullRequestDraft } from "src/types";

export default {
  title: "ContributionIcon",
  component: ContributionIcon,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        ...Object.values(GithubPullRequestStatus),
        ...Object.values(GithubIssueStatus),
        ...Object.values(GithubCodeReviewStatus),
        GithubPullRequestDraft.Draft,
      ],
    },
    type: {
      control: { type: "select" },
      options: [...Object.values(GithubContributionType)],
    },
  },
};

const defaultProps: ComponentProps<typeof ContributionIcon> = {
  status: GithubPullRequestStatus.Open,
  type: GithubContributionType.PullRequest,
};

export const Default = {
  render: (args: typeof ContributionIcon) => <ContributionIcon {...defaultProps} {...args} />,
};
