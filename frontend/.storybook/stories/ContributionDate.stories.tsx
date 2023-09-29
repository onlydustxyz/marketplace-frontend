import { ComponentProps } from "react";
import { GithubPullRequestStatus } from "src/__generated/graphql";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { GithubContributionType } from "src/types";

export default {
  title: "ContributionDate",
  component: ContributionDate,
};

const defaultProps: ComponentProps<typeof ContributionDate> = {
  id: "test",
  type: GithubContributionType.PullRequest,
  status: GithubPullRequestStatus.Open,
  date: new Date("2021-08-01T00:00:00.000Z"),
};

export const Default = {
  render: (args: typeof ContributionDate) => (
    <div className="flex h-64 items-center justify-center">
      <ContributionDate {...defaultProps} {...args} />
    </div>
  ),
};
