import { MockedProvider } from "@apollo/client/testing";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GET_GITHUB_USER_QUERY } from "src/hooks/useGithubUser";
import { Currency } from "src/types";
import { PaymentRequestFragment } from "src/__generated/graphql";

import PaymentTable from ".";

export default {
  title: "PaymentTable",
  component: PaymentTable,
} as ComponentMeta<typeof PaymentTable>;

const GITHUB_USER_ID = 595505;

const yearsFromNow = (years: number) => new Date(Date.now() - years * 365 * 24 * 3600 * 1000);

const mockPayments: PaymentRequestFragment[] = [
  {
    amountInUsd: 200,
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    recipientId: GITHUB_USER_ID,
    reason: { work_items: ["https://github.com/onlydustxyz/marketplace/pull/1"] },
    requestedAt: yearsFromNow(6),
    payments: [{ amount: 200, currencyCode: Currency.USD }],
    recipient: null,
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: GITHUB_USER_ID,
    reason: { work_items: ["https://github.com/onlydustxyz/marketplace/pull/26"] },
    requestedAt: yearsFromNow(3),
    payments: [],
    recipient: null,
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: GITHUB_USER_ID,
    reason: { work_items: ["https://github.com/onlydustxyz/marketplace/pull/653"] },
    requestedAt: yearsFromNow(3),
    payments: [],
    recipient: { user: { userInfo: { payoutSettings: { EthTransfer: { Name: "vitalik.eth" } } } } },
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
];

const Template: ComponentStory<typeof PaymentTable> = () => (
  <MockedProvider mocks={mocks}>
    <PaymentTable payments={mockPayments} />
  </MockedProvider>
);

export const Default = Template.bind({});
