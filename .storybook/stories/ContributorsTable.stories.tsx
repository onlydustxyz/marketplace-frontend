import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable/View";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import { ContributorT } from "src/types";
import { Field } from "src/pages/ProjectDetails/Contributors";

export default {
  title: "ContributorsTable",
  component: ContributorsTable,
  decorators: [withContributorProfilePanelProvider],
} as ComponentMeta<typeof ContributorsTable>;

const mockContributors: ContributorT[] = [
  {
    githubUserId: 33089347,
    login: "97joseph",
    avatarUrl: "https://avatars.githubusercontent.com/u/33089347?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: null,
    contributionToRewardCount: null,
    pullRequestToReward: null,
    issueToReward: null,
    codeReviewToReward: null
  },
  {
    githubUserId: 786640,
    login: "aackerman",
    avatarUrl: "https://avatars.githubusercontent.com/u/786640?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: 456,
    contributionToRewardCount: 21,
    pullRequestToReward: 10,
    issueToReward: 3,
    codeReviewToReward: 8
  },
  {
    githubUserId: 4391003,
    login: "aalness",
    avatarUrl: "https://avatars.githubusercontent.com/u/4391003?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: 30,
    contributionToRewardCount: null,
    pullRequestToReward: null,
    issueToReward: null,
    codeReviewToReward: null
  },
];

const Template: ComponentStory<typeof ContributorsTable> = args => (
  <ContributorsTable
    contributors={mockContributors}
    isProjectLeader={args.isProjectLeader}
    remainingBudget={args.remainingBudget}
    onRewardGranted={Function.prototype()}
    fetchNextPage={Function.prototype()}
    hasNextPage={false}
    isFetchingNextPage={false}
    sorting={{ field: Field.ToRewardCount, ascending: false }}
    applySorting={Function.prototype()}
  />
);

export const Default = Template.bind({});
Default.args = { isProjectLeader: false, remainingBudget: 10000 };

export const ProjectLeader = Template.bind({});
ProjectLeader.args = { isProjectLeader: true, remainingBudget: 1000 };

export const ProjectLeaderNoMoreBudget = Template.bind({});
ProjectLeaderNoMoreBudget.args = { isProjectLeader: true, remainingBudget: 0 };
