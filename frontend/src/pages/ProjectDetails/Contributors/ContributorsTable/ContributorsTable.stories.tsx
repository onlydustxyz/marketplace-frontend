import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorsTable, { Contributor } from "./View";

export default {
  title: "ContributorsTable",
  component: ContributorsTable,
} as ComponentMeta<typeof ContributorsTable>;

const mockContributors: Contributor[] = [
  {
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    paidContributions: 3,
    totalEarned: 2000,
  },
  {
    login: "AnthonyBuisset",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    isRegistered: true,
    paidContributions: 1,
    totalEarned: 500,
  },
  {
    login: "tdelabro",
    avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
    isRegistered: false,
    paidContributions: 0,
    totalEarned: 0,
  },
];

const Template: ComponentStory<typeof ContributorsTable> = args => (
  <ContributorsTable
    contributors={mockContributors}
    isProjectLeader={args.isProjectLeader}
    remainingBudget={args.remainingBudget}
    onPaymentRequested={Function.prototype()}
  />
);

export const Default = Template.bind({});
Default.args = { isProjectLeader: false, remainingBudget: 10000 };

export const ProjectLeader = Template.bind({});
ProjectLeader.args = { isProjectLeader: true, remainingBudget: 1000 };

export const ProjectLeaderNoMoreBudget = Template.bind({});
ProjectLeaderNoMoreBudget.args = { isProjectLeader: true, remainingBudget: 0 };
