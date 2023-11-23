import { ComponentProps, JSXElementConstructor } from "react";
import { Fields } from "src/components/RewardTable/Headers";
import RewardTable from "src/components/RewardTable/RewardTable";
import { ToasterProvider } from "src/hooks/useToaster";
import { PaymentStatus, PreferredMethod } from "src/types";
import withAuthProvider from "../decorators/withAuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";
const yearsFromNow = (years: number) => new Date(Date.now() - years * 365 * 24 * 3600 * 1000);

const mockPayments: ComponentProps<typeof RewardTable>["rewards"] = [
  {
    amount: { currency: "USD", total: 200 },
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    requestedAt: yearsFromNow(6).toISOString(),
    numberOfRewardedContributions: 1,
    rewardedUserAvatar: "https://avatars.githubusercontent.com/u/595505?v=4",
    rewardedUserLogin: "ofux",
    status: PaymentStatus.COMPLETE,
  },
  {
    amount: { currency: "USD", total: 100 },
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    requestedAt: yearsFromNow(3).toISOString(),
    numberOfRewardedContributions: 2,
    rewardedUserAvatar: "https://avatars.githubusercontent.com/u/595505?v=4",
    rewardedUserLogin: "ofux",
    status: PaymentStatus.PENDING_INVOICE,
  },
  {
    amount: { currency: "USD", total: 100 },
    id: "6397226d-0461-4451-962c-a61e36fd3sju",
    requestedAt: yearsFromNow(3).toISOString(),
    numberOfRewardedContributions: 3,
    rewardedUserAvatar: "https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg",
    rewardedUserLogin: "Vitalik",
    status: PaymentStatus.PENDING_SIGNUP,
  },
];

const queryClient = new QueryClient();

export default {
  title: "RewardTable",
  component: RewardTable,
  decorators: [
    (Story: JSXElementConstructor<any>) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
    withAuthProvider({ userId: USER_ID }),
  ],
};

export const Default = {
  render: () => (
    <ToasterProvider>
      <RewardTable
        projectId="project-1"
        rewards={mockPayments}
        options={{
          fetchNextPage: (() => {}) as ComponentProps<typeof RewardTable>["options"]["fetchNextPage"],
          hasNextPage: false,
          sorting: { field: Fields.Date, isAscending: false },
          sortField: () => {},
          isFetchingNextPage: false,
          refetch: (() => {}) as ComponentProps<typeof RewardTable>["options"]["refetch"],
          refetchBudgets: (() => {}) as ComponentProps<typeof RewardTable>["options"]["refetchBudgets"],
        }}
      />
    </ToasterProvider>
  ),
};
