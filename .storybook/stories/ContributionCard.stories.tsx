import { ComponentProps } from "react";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributionDetailPanelProvider from "../decorators/withContributionDetailPanelProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withRewardDetailPanelProvider from "../decorators/withRewardDetailPanelProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import { contribution } from "../mocks/contribution";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionCard",
  component: ContributionCard,
  decorators: [
    withRouter,
    withAuthProvider({ userId: USER_ID }),
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    withQueryClientProvider,
    withRewardDetailPanelProvider,
    withContributorProfilePanelProvider,
    withContributionDetailPanelProvider,
  ],
};

const defaultProps: ComponentProps<typeof ContributionCard> = {
  contribution,
};

export const Default = {
  render: (args: typeof ContributionCard) => (
    <div className="flex">
      <ContributionCard {...defaultProps} {...args} />
    </div>
  ),
};
