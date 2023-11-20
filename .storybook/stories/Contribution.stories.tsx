import { withRouter } from "storybook-addon-react-router-v6";

import { UserIdentityDocument } from "src/__generated/graphql";
import { Contribution } from "src/components/Contribution/Contribution";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributionDetailPanelProvider from "../decorators/withContributionDetailPanelProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import withRewardDetailPanelProvider from "../decorators/withRewardDetailPanelProvider";
import { contribution } from "../mocks/contribution";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

const mocks = [
  {
    request: {
      query: UserIdentityDocument,
      variables: { userId: USER_ID },
    },
    result: {
      data: {
        userPayoutInfo: [
          {
            userId: USER_ID,
            lastname: "Bar",
            firstname: "Foo",
          },
        ],
      },
    },
  },
];

export default {
  title: "Contribution",
  component: Contribution,
  argTypes: {
    isMobile: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    withRouter,
    withMockedProvider(mocks),
    withAuthProvider({ userId: USER_ID }),
    withContributorProfilePanelProvider,
    withContributionDetailPanelProvider,
    withRewardDetailPanelProvider,
  ],
};

export const Default = {
  render: (args: typeof Contribution) => <Contribution contribution={contribution} {...args} />,
};
