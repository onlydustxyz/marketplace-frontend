import { ComponentProps } from "react";
import withAuthProvider from "../decorators/withAuthProvider";
import { ContributionReward } from "src/components/Contribution/ContributionReward";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionReward",
  component: ContributionReward,
  decorators: [withAuthProvider({ userId: USER_ID })],
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
