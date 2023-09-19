import { ContributionStatus, ContributionStatusEnum } from "src/components/ContributionStatus/ContributionStatus";

export default {
  title: "ContributionStatus",
  component: ContributionStatus,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        ContributionStatusEnum.PendingReviewer,
        ContributionStatusEnum.UnderReview,
        ContributionStatusEnum.Approved,
        ContributionStatusEnum.ChangesRequested,
      ],
    },
  },
};

const defaultProps: React.ComponentProps<typeof ContributionStatus> = {
  status: ContributionStatusEnum.PendingReviewer,
};

export const Default = {
  render: (args: typeof ContributionStatus) => <ContributionStatus {...defaultProps} {...args} />,
};
