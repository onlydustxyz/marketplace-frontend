import { SuspenseCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import {
  GetUserPayoutSettingsDocument,
  ExtendedPaymentRequestFragment,
  UserPayoutSettingsFragment,
  GithubUserFragment,
  GetUserPayoutSettingsQueryResult,
} from "src/__generated/graphql";

import PaymentTable from ".";

export default {
  title: "PaymentTable",
  component: PaymentTable,
};

const GITHUB_USER_ID = 595505;
const GITHUB_USER_ID2 = 1321654;

const yearsFromNow = (years: number) => new Date(Date.now() - years * 365 * 24 * 3600 * 1000);

const githubRecipient1: GithubUserFragment = {
  __typename: "GithubUsers",
  id: GITHUB_USER_ID,
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  htmlUrl: "",
  user: null,
};

const githubRecipient2: GithubUserFragment = {
  __typename: "GithubUsers",
  id: GITHUB_USER_ID2,
  login: "Vitalik",
  avatarUrl: "https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg",
  htmlUrl: "",
  user: null,
};

const mockPayments: ExtendedPaymentRequestFragment[] = [
  {
    amountInUsd: 200,
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    recipientId: githubRecipient1.id,
    githubRecipient: githubRecipient1,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(6),
    paymentsAggregate: { aggregate: { sum: { amount: 200 } } },
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: githubRecipient1.id,
    githubRecipient: githubRecipient1,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(3),
    paymentsAggregate: { aggregate: { sum: { amount: 0 } } },
  },
  {
    amountInUsd: 100,
    id: "6397226d-0461-4451-962c-a61e36fd3sju",
    recipientId: githubRecipient2.id,
    githubRecipient: githubRecipient2,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(3),
    paymentsAggregate: { aggregate: { sum: { amount: 0 } } },
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
            userInfo: {
              __typename: "UserInfo",
              payoutSettings: { EthTransfer: { Name: "vitalik.eth" } },
              arePayoutSettingsValid: true,
            } as UserPayoutSettingsFragment,
          },
        ],
      } as GetUserPayoutSettingsQueryResult["data"],
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
