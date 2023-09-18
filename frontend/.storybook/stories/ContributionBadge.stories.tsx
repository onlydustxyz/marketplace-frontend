import {
  ContributionBadge,
  ContributionBadgeStatus,
  ContributionBadgeType,
} from "src/components/ContributionBadge/ContributionBadge";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        ContributionBadgeStatus.Open,
        ContributionBadgeStatus.Merged,
        ContributionBadgeStatus.Closed,
        ContributionBadgeStatus.Draft,
      ],
    },
    type: {
      control: { type: "select" },
      options: [ContributionBadgeType.PR, ContributionBadgeType.Issue, ContributionBadgeType.CodeReview],
    },
  },
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge id="123" {...args} />,
};

export const AsExternal = {
  render: (args: typeof ContributionBadge) => <ContributionBadge id="123" external {...args} />,
};

// export const IconOnly = {
//   render: (args: typeof Button) => (
//     <Button iconOnly {...args}>
//       <i className="ri-send-plane-2-line" />
//     </Button>
//   ),
// };
