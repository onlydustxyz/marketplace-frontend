import { ComponentProps } from "react";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { GithubContributionReviewStatus } from "src/types";

export default {
  title: "ContributionReview",
  component: ContributionReview,
};

const defaultProps: ComponentProps<typeof ContributionReview> = {
  status: GithubContributionReviewStatus.PendingReviewer,
};

export const Default = {
  render: (args: typeof ContributionReview) => <ContributionReview {...defaultProps} {...args} />,
};
