import { ContributionReview, ContributionReviewStatus } from "src/components/ContributionReview/ContributionReview";

export default {
  title: "ContributionReview",
  component: ContributionReview,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        ContributionReviewStatus.PendingReviewer,
        ContributionReviewStatus.UnderReview,
        ContributionReviewStatus.Approved,
        ContributionReviewStatus.ChangesRequested,
      ],
    },
  },
};

const defaultProps: React.ComponentProps<typeof ContributionReview> = {
  status: ContributionReviewStatus.PendingReviewer,
};

export const Default = {
  render: (args: typeof ContributionReview) => <ContributionReview {...defaultProps} {...args} />,
};
