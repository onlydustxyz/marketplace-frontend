import FeedbackButton from "src/App/Layout/Header/FeedbackButton";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "FeedbackButton",
  component: FeedbackButton,
  decorators: [
    withRouter,
    withQueryClientProvider,
    withImpersonationClaimsProvider,
    withTokenSetProvider,
    withAuthProvider({ userId: USER_ID }),
  ],
};

export const Default = {
  render: () => <FeedbackButton />,
};
