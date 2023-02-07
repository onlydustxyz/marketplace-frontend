import { SuspenseCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GET_GITHUB_USER_QUERY } from "src/hooks/useGithubUser";
import { GET_USER_PAYOUT_SETTINGS } from "src/hooks/usePayoutSettings";
import { Currency } from "src/types";
import { PaymentRequestFragment } from "src/__generated/graphql";

import PaymentTable from ".";

export default {
  title: "PaymentTable",
  component: PaymentTable,
} as ComponentMeta<typeof PaymentTable>;

const GITHUB_USER_ID = 595505;
const GITHUB_USER_ID2 = 1321654;

const yearsFromNow = (years: number) => new Date(Date.now() - years * 365 * 24 * 3600 * 1000);

const mockPayments: PaymentRequestFragment[] = [
  {
    amountInUsd: 200,
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    recipientId: GITHUB_USER_ID,
    reason: { work_items: ["https://github.com/onlydustxyz/marketplace/pull/1"] },
    requestedAt: yearsFromNow(6),
    payments: [{ amount: 200, currencyCode: Currency.USD }],
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: GITHUB_USER_ID,
    reason: { work_items: ["https://github.com/onlydustxyz/marketplace/pull/26"] },
    requestedAt: yearsFromNow(3),
    payments: [],
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: GITHUB_USER_ID2,
    reason: { work_items: ["https://github.com/onlydustxyz/marketplace/pull/653"] },
    requestedAt: yearsFromNow(3),
    payments: [],
  },
];

const mocks = [
  {
    request: {
      query: GET_GITHUB_USER_QUERY,
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
      query: GET_GITHUB_USER_QUERY,
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
      query: GET_USER_PAYOUT_SETTINGS,
      variables: { githubUserId: GITHUB_USER_ID2 },
    },
    result: {
      data: {
        authGithubUsers: [{ user: { userInfo: { payoutSettings: { EthTransfer: { Name: "vitalik.eth" } } } } }],
      },
    },
  },
];

const suspenseCache = new SuspenseCache();

const Template: ComponentStory<typeof PaymentTable> = () => (
  <MockedProvider mocks={mocks} suspenseCache={suspenseCache}>
    <PaymentTable payments={mockPayments} />
  </MockedProvider>
);

export const Default = Template.bind({});
