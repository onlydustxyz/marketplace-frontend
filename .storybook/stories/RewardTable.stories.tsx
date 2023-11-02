import {
  GetUserPayoutSettingsDocument,
  GetUserPayoutSettingsQueryResult,
  PreferredMethod,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";

import { ComponentProps } from "react";
import RewardTable from "src/components/RewardTable/RewardTable";
import { ToasterProvider } from "src/hooks/useToaster";
import { PaymentStatus } from "src/types";
import withAuthProvider from "../decorators/withAuthProvider";
import withMockedProvider from "../decorators/withMockedProvider";

const GITHUB_USER_ID2 = 1321654;
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

const mocks = [
  {
    request: {
      query: GetUserPayoutSettingsDocument,
      variables: { githubUserId: GITHUB_USER_ID2 },
    },
    result: {
      data: {
        registeredUsers: [
          {
            githubUserId: GITHUB_USER_ID2,
            id: "user-1",
            userPayoutInfo: {
              __typename: "UserPayoutInfo",
              address: "avenue de la gare",
              city: "Paris",
              postCode: "75000",
              country: "France",
              firstname: "James",
              lastname: "Bond",
              isCompany: false,
              companyIdentificationNumber: null,
              companyName: null,
              bic: null,
              ethWallet: "007.eth",
              iban: null,
              usdPreferredMethod: PreferredMethod.Crypto,
              userId: "user-1",
              arePayoutSettingsValid: true,
            } as UserPayoutSettingsFragment,
          },
        ],
      } as GetUserPayoutSettingsQueryResult["data"],
    },
  },
];

export default {
  title: "RewardTable",
  component: RewardTable,
  decorators: [withMockedProvider(mocks), withAuthProvider({ userId: USER_ID })],
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
          sorting: { field: undefined, isAscending: undefined },
          sortField: () => {},
          isFetchingNextPage: false,
          refetch: (() => {}) as ComponentProps<typeof RewardTable>["options"]["refetch"],
          refetchBudgets: (() => {}) as ComponentProps<typeof RewardTable>["options"]["refetchBudgets"],
        }}
      />
    </ToasterProvider>
  ),
};
