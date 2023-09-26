import { ComponentProps } from "react";

import { ContributionReward } from "src/components/Contribution/ContributionReward";

export default {
  title: "ContributionReward",
  component: ContributionReward,
  argTypes: {
    rewards: {
      control: { type: "text" },
    },
  },
};

const defaultProps: ComponentProps<typeof ContributionReward> = {
  id: "123",
  rewards: [],
};

export const Default = {
  render: (args: typeof ContributionReward) => <ContributionReward {...defaultProps} {...args} />,
};
