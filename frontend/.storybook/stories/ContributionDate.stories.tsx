import { ComponentProps } from "react";

import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { GithubContributionIconStatus, GithubContributionType } from "src/types";

export default {
  title: "ContributionDate",
  component: ContributionDate,
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
  },
};

const defaultProps: ComponentProps<typeof ContributionDate> = {
  id: "test",
  type: GithubContributionType.PullRequest,
  status: GithubContributionIconStatus.Open,
  date: new Date("2021-08-01T00:00:00.000Z"),
};

export const Default = {
  render: (args: typeof ContributionDate) => (
    <div className="flex h-64 items-center justify-center">
      <p id="test" className="inline-block">
        Hello world
      </p>
      <ContributionDate {...defaultProps} {...args} />
    </div>
  ),
};
