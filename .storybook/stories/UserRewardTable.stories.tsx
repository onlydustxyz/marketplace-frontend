import { Currency, PaymentStatus } from "src/types";

import { ComponentProps } from "react";
import UserRewardTable from "src/components/UserRewardTable";
import { Fields } from "src/components/UserRewardTable/Headers";
import { MyRewardType as Reward } from "src/components/UserRewardTable/Line";
import { daysFromNow } from "src/utils/date";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "UserRewardTable",
  component: UserRewardTable,
  decorators: [withAuthProvider({ userId: USER_ID }), withImpersonationClaimsProvider, withTokenSetProvider,withQueryClientProvider],
};

export const Default = {
  render: () => (
    <UserRewardTable />
  ),
};
