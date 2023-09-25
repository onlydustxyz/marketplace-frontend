import { ComponentProps } from "react";

import { ContributionIconType, ContributionIconStatus } from "src/components/ContributionIcon/ContributionIcon";
import { ContributionDateTooltip } from "src/components/ContributionDateTooltip/ContributionDateTooltip";

export default {
  title: "ContributionDateTooltip",
  component: ContributionDateTooltip,
  argTypes: {
    type: {
      control: { type: "select" },
      options: [ContributionIconType.PullRequest, ContributionIconType.Issue, ContributionIconType.CodeReview],
    },
    status: {
      control: { type: "select" },
      options: [
        ContributionIconStatus.Open,
        ContributionIconStatus.Merged,
        ContributionIconStatus.Closed,
        ContributionIconStatus.Draft,
      ],
    },
  },
};

const defaultProps: ComponentProps<typeof ContributionDateTooltip> = {
  id: "test",
  type: ContributionIconType.PullRequest,
  status: ContributionIconStatus.Open,
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
