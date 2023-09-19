import { ContributionReward } from "src/components/ContributionReward/ContributionReward";

export default {
  title: "ContributionReward",
  component: ContributionReward,
  argTypes: {
    rewards: {
      control: { type: "text" },
    },
  },
};

const defaultProps: React.ComponentProps<typeof ContributionReward> = {
  rewards: 0,
};

export const Default = {
  render: (args: typeof ContributionReward) => <ContributionReward {...defaultProps} {...args} />,
};
