import {
  GetUserPayoutSettingsDocument,
  ExtendedPaymentRequestFragment,
  UserPayoutSettingsFragment,
  GithubUserFragment,
  GetUserPayoutSettingsQueryResult,
  PreferredMethod,
} from "src/__generated/graphql";

import RewardTable from "src/components/RewardTable";
import { ToasterProvider } from "src/hooks/useToaster";
import withMockedProvider from "../decorators/withMockedProvider";

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
    amount: 200,
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    recipientId: githubRecipient1.id,
    githubRecipient: githubRecipient1,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(6),
    paymentsAggregate: { aggregate: { sum: { amount: 200 } } },
  },
  {
    amount: 100,
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipientId: githubRecipient1.id,
    githubRecipient: githubRecipient1,
    workItemsAggregate: { aggregate: { count: 1 } },
    requestedAt: yearsFromNow(3),
    paymentsAggregate: { aggregate: { sum: { amount: 0 } } },
  },
  {
    amount: 100,
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
  decorators: [withMockedProvider(mocks)],
};

export const Default = {
  render: () => (
    <ToasterProvider>
      <RewardTable projectId="project-1" rewards={mockPayments} />
    </ToasterProvider>
  ),
};
