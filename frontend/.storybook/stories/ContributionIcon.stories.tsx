import { ComponentProps } from "react";
import { GithubPullRequestStatus } from "src/__generated/graphql";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import { GithubContributionType } from "src/types";

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
