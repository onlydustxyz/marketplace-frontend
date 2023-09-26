import { ComponentProps } from "react";

import { ContributionIconStatus, ContributionIconType } from "src/components/ContributionIcon/ContributionIcon";
import { ContributionBadge } from "src/components/ContributionBadge/ContributionBadge";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [ContributionIconStatus.Open, ContributionIconStatus.Merged, ContributionIconStatus.Closed],
    },
    type: {
      control: { type: "select" },
      options: [ContributionIconType.PullRequest, ContributionIconType.Issue, ContributionIconType.CodeReview],
    },
    draft: "boolean",
    external: "boolean",
  },
};

const defaultProps: ComponentProps<typeof ContributionBadge> = {
  number: 123,
  status: ContributionIconStatus.Open,
  type: ContributionIconType.PullRequest,
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};

const externalProps: ComponentProps<typeof ContributionBadge> = {
  ...defaultProps,
  external: true,
};

export const AsExternal = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...externalProps} {...args} />,
};
