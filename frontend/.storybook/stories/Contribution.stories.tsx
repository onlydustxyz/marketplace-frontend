import {
  Contribution,
  ContributionType,
  ContributionStatus,
  ContributionReview,
} from "src/components/Contribution/Contribution";

export default {
  title: "Contribution",
  component: Contribution,
  argTypes: {
    type: {
      control: { type: "select" },
      options: [ContributionType.PullRequest, ContributionType.Issue, ContributionType.CodeReview],
    },
    status: {
      control: { type: "select" },
      options: [
        ContributionStatus.Open,
        ContributionStatus.Merged,
        ContributionStatus.Closed,
        ContributionStatus.Draft,
      ],
    },
    review: {
      control: { type: "select" },
      options: [
        ContributionReview.PendingReviewer,
        ContributionReview.UnderReview,
        ContributionReview.Approved,
        ContributionReview.ChangesRequested,
      ],
    },
  },
};

const defaultProps: React.ComponentProps<typeof Contribution> = {
  name: "Name of PR / Issue / Other work ",
  url: "#",
  number: 123,
  type: ContributionType.PullRequest,
  status: ContributionStatus.Open,
  review: ContributionReview.PendingReviewer,
  rewards: 0,
  external: false,
};

export const Default = {
  render: (args: typeof Contribution) => <Contribution {...defaultProps} {...args} />,
};
