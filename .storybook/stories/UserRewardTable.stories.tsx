import { Currency, PaymentStatus } from "src/types";

import { ComponentProps } from "react";
import UserRewardTable from "src/components/UserRewardTable";
import { Fields } from "src/components/UserRewardTable/Headers";
import { MyRewardType as Reward } from "src/components/UserRewardTable/Line";
import { daysFromNow } from "src/utils/date";
import withAuthProvider from "../decorators/withAuthProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

const mockPayments: Reward[] = [
  {
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    amount: {
      total: 2000,
      currency: Currency.USD,
    },
    numberOfRewardedContributions: 2,
    projectId: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
    requestedAt: daysFromNow(700).toISOString(),
    rewardedOnProjectLogoUrl: "",
    rewardedOnProjectName: "Project 1",
    status: PaymentStatus.COMPLETE,
  },
  {
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    amount: {
      total: 3000,
      currency: Currency.ETH,
    },
    numberOfRewardedContributions: 3,
    projectId: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
    requestedAt: daysFromNow(200).toISOString(),
    rewardedOnProjectLogoUrl: "",
    rewardedOnProjectName: "Project 2",
    status: PaymentStatus.PENDING_INVOICE,
  },
];

export default {
  title: "UserRewardTable",
  component: UserRewardTable,
  decorators: [withAuthProvider({ userId: USER_ID })],
};

export const Default = {
  render: () => (
    <UserRewardTable
      rewards={mockPayments}
      fetchNextPage={(() => {}) as ComponentProps<typeof UserRewardTable>["fetchNextPage"]}
      hasNextPage={false}
      isFetchingNextPage={false}
      sorting={{
        field: Fields.Date,
        isAscending: false,
      }}
      sortField={() => {}}
    />
  ),
};
