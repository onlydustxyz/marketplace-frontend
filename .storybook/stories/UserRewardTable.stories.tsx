import UserRewardTable from "src/components/UserRewardTable";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "UserRewardTable",
  component: UserRewardTable,
  decorators: [
    withAuthProvider({ userId: USER_ID }),
    withImpersonationClaimsProvider,
    withTokenSetProvider,
    withQueryClientProvider,
  ],
};

export const Default = {
  render: () => <UserRewardTable />,
};
