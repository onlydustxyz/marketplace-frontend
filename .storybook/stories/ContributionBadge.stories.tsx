import { ComponentProps } from "react";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";

import { contribution } from "../mocks/contribution";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
};

const defaultProps: ComponentProps<typeof ContributionBadge> = {
  contribution,
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};
