import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { Fields } from "src/pages/ProjectDetails/Contributors/ContributorsTable/Headers";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable/View";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import { RewardDisabledReason } from "src/pages/ProjectDetails/Contributors/ContributorsTable/Line";

export default {
  title: "ContributorsTable",
  component: ContributorsTable,
  decorators: [withContributorProfilePanelProvider],
} as ComponentMeta<typeof ContributorsTable>;

const mockContributors: ComponentProps<typeof ContributorsTable>["contributors"] = [
  {
    githubUserId: 43467246,
    login: "AnthonyBuisset",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    contributionCount: 861,
    rewardCount: 2,
    earned: {
      totalAmount: 2000,
      details: [
        {
          totalAmount: 2000,
          totalDollarsEquivalent: 2000,
          currency: "USD",
        },
      ],
    },
    contributionToRewardCount: 857,
    pullRequestToReward: 487,
    issueToReward: 11,
    codeReviewToReward: 359,
    isRegistered: true,
  },
  {
    githubUserId: 33089347,
    login: "97joseph",
    avatarUrl: "https://avatars.githubusercontent.com/u/33089347?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: {
      totalAmount: 2000,
      details: [
        {
          totalAmount: 2000,
          totalDollarsEquivalent: 2000,
          currency: "USD",
        },
      ],
    },
    contributionToRewardCount: undefined,
    pullRequestToReward: undefined,
    issueToReward: undefined,
    codeReviewToReward: undefined,
    isRegistered: false,
  },
  {
    githubUserId: 786640,
    login: "aackerman",
    avatarUrl: "https://avatars.githubusercontent.com/u/786640?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: {
      totalAmount: 2000,
      details: [
        {
          totalAmount: 2000,
          totalDollarsEquivalent: 2000,
          currency: "USD",
        },
      ],
    },
    contributionToRewardCount: 21,
    pullRequestToReward: 10,
    issueToReward: 3,
    codeReviewToReward: 8,
    isRegistered: true,
  },
  {
    githubUserId: 4391003,
    login: "aalness",
    avatarUrl: "https://avatars.githubusercontent.com/u/4391003?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: {
      totalAmount: 2000,
      details: [
        {
          totalAmount: 2000,
          totalDollarsEquivalent: 2000,
          currency: "USD",
        },
      ],
    },
    contributionToRewardCount: undefined,
    pullRequestToReward: undefined,
    issueToReward: undefined,
    codeReviewToReward: undefined,
    isRegistered: true,
  },
];

const Template: ComponentStory<typeof ContributorsTable> = args => (
  <ContributorsTable
    contributors={mockContributors}
    isProjectLeader={args.isProjectLeader}
    onRewardGranted={Function.prototype()}
    fetchNextPage={Function.prototype()}
    hasNextPage={false}
    isFetchingNextPage={false}
    sorting={{ field: Fields.ToRewardCount, isAscending: false }}
    sortField={Function.prototype()}
  />
);

export const Default = Template.bind({});
Default.args = { isProjectLeader: false };

export const ProjectLeader = Template.bind({});
ProjectLeader.args = { isProjectLeader: true };

export const ProjectLeaderNoMoreBudget = Template.bind({});
ProjectLeaderNoMoreBudget.args = { isProjectLeader: true, rewardDisableReason: RewardDisabledReason.Budget };
