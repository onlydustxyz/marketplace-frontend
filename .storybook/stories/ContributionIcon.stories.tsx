import { ComponentProps } from "react";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import { GithubContributionType, GithubPullRequestStatus } from "src/types";

export default {
  title: "ContributionIcon",
  component: ContributionIcon,
};

const defaultProps: ComponentProps<typeof ContributionIcon> = {
  status: GithubPullRequestStatus.Open,
  type: GithubContributionType.PullRequest,
};

export const Default = {
  render: (args: typeof ContributionIcon) => <ContributionIcon {...defaultProps} {...args} />,
};
