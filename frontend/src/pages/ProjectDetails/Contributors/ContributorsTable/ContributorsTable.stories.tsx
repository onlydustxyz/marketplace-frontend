import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorsTable, { Contributor } from "./View";
import withContributorProfilePanelProvider from "src/test/storybook/decorators/withContributorProfilePanelProvider";

export default {
  title: "ContributorsTable",
  component: ContributorsTable,
  decorators: [withContributorProfilePanelProvider],
} as ComponentMeta<typeof ContributorsTable>;

const mockContributors: Contributor[] = [
  {
    githubUserId: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    userId: "user-1",
    paidContributionsCount: 3,
    totalEarned: 2000,
    unpaidMergedPullsCount: 3,
  },
  {
    githubUserId: 43467246,
    login: "AnthonyBuisset",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    userId: "user-2",
    paidContributionsCount: 1,
    totalEarned: 500,
    unpaidMergedPullsCount: 10,
  },
  {
    githubUserId: 34384633,
    login: "tdelabro",
    avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
    paidContributionsCount: 0,
    totalEarned: 0,
  },
];

const Template: ComponentStory<typeof ContributorsTable> = args => (
  <ContributorsTable
    contributors={mockContributors}
    isProjectLeader={args.isProjectLeader}
    remainingBudget={args.remainingBudget}
    onRewardGranted={Function.prototype()}
  />
);

export const Default = Template.bind({});
Default.args = { isProjectLeader: false, remainingBudget: 10000 };

export const ProjectLeader = Template.bind({});
ProjectLeader.args = { isProjectLeader: true, remainingBudget: 1000 };

export const ProjectLeaderNoMoreBudget = Template.bind({});
ProjectLeaderNoMoreBudget.args = { isProjectLeader: true, remainingBudget: 0 };
