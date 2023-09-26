import { ComponentProps } from "react";

import { ContributionIconType, ContributionIconStatus } from "src/components/ContributionIcon/ContributionIcon";
import { ContributionBadgeTooltip } from "src/components/ContributionBadgeTooltip/ContributionBadgeTooltip";
import { ContributionBadge } from "src/components/ContributionBadge/ContributionBadge";

export default {
  title: "ContributionBadgeTooltip",
  component: ContributionBadgeTooltip,
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

const defaultProps: ComponentProps<typeof ContributionBadgeTooltip> = {
  id: "test",
  type: ContributionIconType.PullRequest,
  status: ContributionIconStatus.Open,
  number: 123,
  title: "Name of PR / Issue / Other work ",
  description: "Description of PR / Issue / Other work ",
};

export const Default = {
  render: (args: typeof ContributionBadgeTooltip) => (
    <div className="flex h-64 items-center justify-center">
      <ContributionBadgeTooltip {...defaultProps} {...args} />
      <div id="test">
        <ContributionBadge {...defaultProps} />
      </div>
    </div>
  ),
};

const authorProps: ComponentProps<typeof ContributionBadgeTooltip> = {
  ...defaultProps,
  author: {
    id: 456,
    avatarUrl: "#",
    htmlUrl: "#",
    login: "github-user",
    user: null,
  },
};

export const WithAuthor = {
  render: (args: typeof ContributionBadgeTooltip) => (
    <div className="flex h-64 items-center justify-center">
      <ContributionBadgeTooltip {...authorProps} {...args} />
      <div id="test">
        <ContributionBadge {...defaultProps} />
      </div>
    </div>
  ),
};
