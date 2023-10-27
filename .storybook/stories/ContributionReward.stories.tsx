import { ComponentProps } from "react";
import withAuthProvider from "../decorators/withAuthProvider";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import withRewardDetailPanelProvider from "../decorators/withRewardDetailPanelProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionReward",
  component: ContributionReward,
  decorators: [withAuthProvider({ userId: USER_ID }), withRewardDetailPanelProvider],
};

const defaultProps: ComponentProps<typeof ContributionReward> = {
  id: "123",
  rewards: [
    {
      paymentId: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
      paymentRequest: {
        projectId: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      },
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
      paymentRequest: {
        projectId: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      },
    },
    {
      paymentId: "35234563456345-2ab9-406d-9bf1-3012b6f565bc",
      paymentRequest: {
        projectId: "3073ac50-5ff5-4b71-9cb2-56097d3ee8e5",
      },
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
