import { SuspenseCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import {
  GetGithubUserDocument,
  GetUserPayoutSettingsDocument,
  ExtendedPaymentRequestFragment,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";

import PaymentTable from ".";

export default {
  title: "PaymentTable",
  component: PaymentTable,
};

const GITHUB_USER_ID = 595505;
const GITHUB_USER_ID2 = 1321654;

const yearsFromNow = (years: number) => new Date(Date.now() - years * 365 * 24 * 3600 * 1000);

const mockPayments: ExtendedPaymentRequestFragment[] = [
  {
    amountInUsd: 200,
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    recipientId: GITHUB_USER_ID,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(6),
    paymentsAggregate: { aggregate: { sum: { amount: 200 } } },
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: GITHUB_USER_ID,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(3),
    paymentsAggregate: { aggregate: { sum: { amount: 0 } } },
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd3sju",
    recipientId: GITHUB_USER_ID2,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(3),
    paymentsAggregate: { aggregate: { sum: { amount: 0 } } },
  },
];

const mocks = [
  {
    request: {
      query: GetGithubUserDocument,
      variables: { githubUserId: GITHUB_USER_ID },
    },
    result: {
      data: {
        fetchUserDetailsById: {
          __typename: "User",
          id: GITHUB_USER_ID,
          login: "ofux",
          avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
        },
      },
    },
  },
  {
    request: {
      query: GetGithubUserDocument,
      variables: { githubUserId: GITHUB_USER_ID2 },
    },
    result: {
      data: {
        fetchUserDetailsById: {
          __typename: "User",
          id: GITHUB_USER_ID2,
          login: "Vitalik",
          avatarUrl: "https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg",
        },
      },
    },
  },
  {
    request: {
      query: GetUserPayoutSettingsDocument,
      variables: { githubUserId: GITHUB_USER_ID2 },
    },
    result: {
      data: {
        authGithubUsers: [
          {
            user: {
              userInfo: {
                __typename: "UserInfo",
                payoutSettings: { EthTransfer: { Name: "vitalik.eth" } },
                arePayoutSettingsValid: true,
              } as UserPayoutSettingsFragment,
            },
          },
        ],
      },
    },
  },
];

const suspenseCache = new SuspenseCache();

export const Default = {
  render: () => (
    <MockedProvider mocks={mocks} suspenseCache={suspenseCache}>
      <PaymentTable projectId="project-1" payments={mockPayments} />
    </MockedProvider>
  ),
};
