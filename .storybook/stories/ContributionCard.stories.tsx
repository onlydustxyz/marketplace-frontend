import { ComponentProps } from "react";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { withRouter } from "storybook-addon-react-router-v6";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import { contribution } from "../mocks/contribution";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionCard",
  component: ContributionCard,
  decorators: [
    withRouter,
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    withQueryClientProvider,
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
