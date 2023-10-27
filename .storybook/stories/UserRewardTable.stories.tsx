import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Currency, PaymentStatus } from "src/types";

import UserRewardTable from "src/components/UserRewardTable";
import { MyRewardType as Reward } from "src/components/UserRewardTable/Line";
import { Field } from "src/pages/Rewards";
import { daysFromNow } from "src/utils/date";

export default {
  title: "UserRewardTable",
  component: UserRewardTable,
} as ComponentMeta<typeof UserRewardTable>;

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

const Template: ComponentStory<typeof UserRewardTable> = args => (
  <UserRewardTable
    rewards={mockPayments}
    fetchNextPage={() => {}}
    hasNextPage={false}
    isFetchingNextPage={false}
    sorting={{
      field: Field.Date,
      ascending: false,
    }}
    applySorting={() => {}}
  />
);

export const Default = Template.bind({});
