import { ComponentProps } from "react";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { contribution } from "../mocks/contribution";

export default {
  title: "ContributionReward",
  component: ContributionReward,
};

const defaultProps: ComponentProps<typeof ContributionReward> = {
  contributionId: contribution.id,
  rewardIds: [contribution.rewardIds[0]],
  projectId: contribution.project.id,
  isMine: false,
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
  projectId: contribution.project.id,
  isMine: false,
};

export const Multiple = {
  render: (args: typeof ContributionReward) => (
    <div className="flex">
      <ContributionReward {...multipleProps} {...args} />
    </div>
  ),
};
