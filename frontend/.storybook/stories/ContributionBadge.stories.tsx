import {
  ContributionBadge,
  ContributionBadgeStatus,
  ContributionBadgeType,
} from "src/components/ContributionBadge/ContributionBadge";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        ContributionBadgeStatus.Open,
        ContributionBadgeStatus.Merged,
        ContributionBadgeStatus.Closed,
        ContributionBadgeStatus.Draft,
      ],
    },
    type: {
      control: { type: "select" },
      options: [ContributionBadgeType.PullRequest, ContributionBadgeType.Issue, ContributionBadgeType.CodeReview],
    },
  },
};

const defaultProps: React.ComponentProps<typeof ContributionBadge> = {
  number: 123,
  status: ContributionBadgeStatus.Open,
  type: ContributionBadgeType.PullRequest,
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};

const externalProps: React.ComponentProps<typeof ContributionBadge> = {
  ...defaultProps,
  external: true,
};

export const AsExternal = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...externalProps} {...args} />,
};
