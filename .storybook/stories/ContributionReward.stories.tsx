import { ComponentProps } from "react";
import withAuthProvider from "../decorators/withAuthProvider";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import withRewardDetailPanelProvider from "../decorators/withRewardDetailPanelProvider";
import { contribution } from "../mocks/contribution";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionReward",
  component: ContributionReward,
  decorators: [withAuthProvider({ userId: USER_ID }), withRewardDetailPanelProvider],
};

const defaultProps: ComponentProps<typeof ContributionReward> = {
  contributionId: contribution.id,
  rewardIds: [contribution.rewardIds[0]],
};

export const Default = {
  render: (args: typeof ContributionReward) => (
    <div className="flex">
      <ContributionReward {...defaultProps} {...args} />
    </div>
  ),
};

const multipleProps: ComponentProps<typeof ContributionReward> = {
  contributionId: contribution.id,
  rewardIds: contribution.rewardIds,
};

export const Multiple = {
  render: (args: typeof ContributionReward) => (
    <div className="flex">
      <ContributionReward {...multipleProps} {...args} />
    </div>
  ),
};
