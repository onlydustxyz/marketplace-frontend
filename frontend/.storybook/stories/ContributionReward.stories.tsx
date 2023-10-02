import { ComponentProps } from "react";
import { ContributionReward } from "src/components/Contribution/ContributionReward";

export default {
  title: "ContributionReward",
  component: ContributionReward,
};

const defaultProps: ComponentProps<typeof ContributionReward> = {
  id: "123",
  rewards: [
    {
      paymentId: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
    },
  ],
};

export const Default = {
  render: (args: typeof ContributionReward) => (
    <div className="flex">
      <ContributionReward {...defaultProps} {...args} />
    </div>
  ),
};

const multipleProps: ComponentProps<typeof ContributionReward> = {
  id: "123",
  rewards: [
    {
      paymentId: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
    },
    {
      paymentId: "35234563456345-2ab9-406d-9bf1-3012b6f565bc",
    },
  ],
};

export const Multiple = {
  render: (args: typeof ContributionReward) => (
    <div className="flex">
      <ContributionReward {...multipleProps} {...args} />
    </div>
  ),
};
