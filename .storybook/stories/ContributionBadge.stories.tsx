import { ComponentProps } from "react";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import { contribution } from "../mocks/contribution";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionBadge",
  component: ContributionBadge,
  decorators: [withAuthProvider({ userId: USER_ID }), withContributorProfilePanelProvider],
};

const defaultProps: ComponentProps<typeof ContributionBadge> = {
  contribution,
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};
