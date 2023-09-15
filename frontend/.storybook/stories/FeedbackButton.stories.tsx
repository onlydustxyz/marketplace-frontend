import { withRouter } from "storybook-addon-react-router-v6";

import FeedbackButton from "src/App/Layout/Header/FeedbackButton";
import { UserIdentityDocument } from "src/__generated/graphql";
import withMockedProvider from "../decorators/withMockedProvider";
import withAuthProvider from "../decorators/withAuthProvider";

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
  title: "FeedbackButton",
  component: FeedbackButton,
  decorators: [withRouter, withMockedProvider(mocks), withAuthProvider({ userId: USER_ID })],
};

export const Default = {
  render: () => <FeedbackButton />,
};
