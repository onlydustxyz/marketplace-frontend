import { withRouter } from "storybook-addon-react-router-v6";

import RewardForm from "src/pages/ProjectDetails/Rewards/RewardForm/View";
import withMockedProvider from "../decorators/withMockedProvider";
import withFormProvider from "../decorators/withFormProvider";
import {
  ContributorFragment,
  GetProjectPendingContributorsDocument,
  GetProjectPendingContributorsQueryResult,
} from "src/__generated/graphql";
import withSuspense from "../decorators/withSuspense";
import withCommandProvider from "../decorators/withCommandProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";


const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

const mockBudgets: ProjectBudgetType = {
  initialDollarsEquivalent: 120000,
  remainingDollarsEquivalent: 86000,
  budgets: [
    {
      currency: "USD",
      initialAmount: 1200,
      remaining: 860,
      remainingDollarsEquivalent: 5007500,
      initialDollarsEquivalent: 10000000,
    },
    {
      currency: "STARK",
      initialAmount: 100,
      remaining: 72,
      remainingDollarsEquivalent: 9987500,
      initialDollarsEquivalent: 10000000,
    },
    {
      currency: "OP",
      initialAmount: 120000,
      remaining: 86000,
      remainingDollarsEquivalent: 86000,
      initialDollarsEquivalent: 10000,
    },
  ],
};

const projectId = "yolo";
const BERNARDSTANISLAS: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 4435377,
  login: "bernardstanislas",
  avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
  userId: null,
  contributionStatsAggregate: {
    aggregate: {
      sum: {
        pullRequestCount: 0,
        issueCount: 0,
        codeReviewCount: 0,
        totalCount: 0,
      },
    },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 0 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};
const OSCARWROCHE: ContributorFragment = {
  login: "oscarwroche",
  avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  githubUserId: 21149076,
  userId: null,
  __typename: "UserProfiles",
  contributionStatsAggregate: {
    aggregate: { sum: { pullRequestCount: 0, issueCount: 0, codeReviewCount: 0, totalCount: 0 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 0 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};
const OFUX: ContributorFragment = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  githubUserId: 595505,
  userId: "yolo",
  __typename: "UserProfiles",
  contributionStatsAggregate: {
    aggregate: { sum: { pullRequestCount: 0, issueCount: 0, codeReviewCount: 0, totalCount: 0 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 0 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};
const ANTHONYBUISSET: ContributorFragment = {
  login: "anthonybuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  githubUserId: 43467246,
  userId: null,
  __typename: "UserProfiles",
  contributionStatsAggregate: {
    aggregate: { sum: { pullRequestCount: 0, issueCount: 0, codeReviewCount: 0, totalCount: 0 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 0 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};
const TDELABRO: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 34384633,
  login: "tdelabro",
  avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
  userId: null,
  contributionStatsAggregate: {
    aggregate: { sum: { pullRequestCount: 0, issueCount: 0, codeReviewCount: 0, totalCount: 0 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 0 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};

const mocks = [
  {
    request: {
      query: GetProjectPendingContributorsDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: {
        projectsPendingContributors: [
          BERNARDSTANISLAS,
          OSCARWROCHE,
          OFUX,
          ANTHONYBUISSET,
          TDELABRO,
          OSCARWROCHE,
          OFUX,
          ANTHONYBUISSET,
          TDELABRO,
          BERNARDSTANISLAS,
        ].map(user => ({ user })),
      } as GetProjectPendingContributorsQueryResult["data"],
    },
  },
];

const args = {
  budget: mockBudgets,
  onWorkEstimationChange: () => {
    return;
  },
  onWorkItemsChange: () => {
    return;
  },
  projectId,
  contributor: null,
  setContributor: () => {
    return;
  },
  unpaidPRs: [],
  requestNewPaymentMutationLoading: false,
  unpaidContributions: null,
};

export default {
  title: "RewardForm",
  argTypes: {
    loading: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    withRouter,
    withMockedProvider(mocks),
    withFormProvider({
      defaultValues: {
        remainingBudget: args.budget.remainingDollarsEquivalent,
      },
    }),
    withSuspense,
    withAuthProvider({ userId: USER_ID }),
    withCommandProvider,
    withContributorProfilePanelProvider,
    withQueryClientProvider,
    withTokenSetProvider,
    withImpersonationClaimsProvider,
  ],
};

export const Default = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RewardForm projectBudget={mockBudgets} {...args} />
    </div>
  ),

  parameters: {
    backgrounds: {
      default: "space",
    },
    docs: {
      // Prevents Storybook crash see https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
      source: {
        code: "Your code snippet goes here.",
        language: "yml",
        type: "auto",
      },
    },
  },
};
