import { withRouter } from "storybook-addon-react-router-v6";
import RewardForm from "src/pages/ProjectDetails/Rewards/RewardForm/View";
import withFormProvider from "../decorators/withFormProvider";
import withSuspense from "../decorators/withSuspense";
import withCommandProvider from "../decorators/withCommandProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import { components } from "src/__generated/api";
import { Contributor } from "src/pages/ProjectDetails/Rewards/RewardForm/types";
import { CompletedRewardableItem } from "src/api/Project/queries";
import withToasterProvider from "../decorators/withToasterProvider";
import { ProjectBudgetType } from "src/types";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

type ContributorMockType = components["schemas"]["ContributorPageItemResponse"];

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

const contributorMock: Contributor = {
  avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
  githubUserId: 123456,
  isRegistered: true,
  login: "string",
  unpaidCompletedContributions: 2,
  htmlUrl: "",
};

const unpaidContributions: CompletedRewardableItem = {
  rewardableCodeReviews: [
    {
      commentsCount: 0,
      commitsCount: 0,
      completedAt: "2023-11-28T11:02:11.779Z",
      contributionId: "string",
      createdAt: "2023-11-28T11:02:11.779Z",
      htmlUrl: "string",
      id: "string",
      ignored: false,
      number: 0,
      repoId: 650626566,
      repoName: "string",
      status: "COMPLETED",
      title: "string",
      type: "CODE_REVIEW",
      userCommitsCount: 0,
    },
  ],
  rewardableIssues: [
    {
      commentsCount: 0,
      commitsCount: 0,
      completedAt: "2023-11-28T11:02:11.779Z",
      contributionId: "string",
      createdAt: "2023-11-28T11:02:11.779Z",
      htmlUrl: "string",
      id: "string",
      ignored: false,
      number: 0,
      repoId: 650626566,
      repoName: "string",
      status: "COMPLETED",
      title: "string",
      type: "CODE_REVIEW",
      userCommitsCount: 0,
    },
  ],
  rewardablePullRequests: [
    {
      commentsCount: 0,
      commitsCount: 0,
      completedAt: "2023-11-28T11:02:11.779Z",
      contributionId: "string",
      createdAt: "2023-11-28T11:02:11.779Z",
      htmlUrl: "string",
      id: "string",
      ignored: false,
      number: 0,
      repoId: 650626566,
      repoName: "string",
      status: "CANCELLED",
      title: "string",
      type: "CODE_REVIEW",
      userCommitsCount: 0,
    },
  ],
};

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
  unpaidContributions: unpaidContributions,
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
    withFormProvider({
      defaultValues: {
        remainingBudget: args.budget.remainingDollarsEquivalent,
      },
    }),
    withSuspense,
    withAuthProvider({ userId: USER_ID }),
    withCommandProvider,
    withQueryClientProvider,
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    withToasterProvider,
  ],
};

export const Default = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RewardForm
        projectBudget={mockBudgets}
        onWorkItemsChange={() => {
          return;
        }}
        projectId="123"
        contributor={contributorMock}
        setContributor={() => {
          return;
        }}
        unpaidContributions={unpaidContributions}
      />
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
