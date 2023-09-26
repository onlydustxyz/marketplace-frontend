import { ComponentProps } from "react";

import { ContributionDateTooltip } from "src/components/Contribution/ContributionDateTooltip";
import { GithubContributionIconStatus, GithubContributionType } from "src/types";

export default {
  title: "ContributionDateTooltip",
  component: ContributionDateTooltip,
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

const defaultProps: ComponentProps<typeof ContributionDateTooltip> = {
  id: "test",
  type: GithubContributionType.PullRequest,
  status: GithubContributionIconStatus.Open,
  date: new Date("2021-08-01T00:00:00.000Z"),
};

export const Default = {
  render: (args: typeof ContributionDateTooltip) => (
    <div className="flex h-64 items-center justify-center">
      <p id="test" className="inline-block">
        Hello world
      </p>
      <ContributionDateTooltip {...defaultProps} {...args} />
    </div>
  ),
};
