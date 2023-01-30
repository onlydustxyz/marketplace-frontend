import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorsTable from ".";
import { Contributor } from ".";

export default {
  title: "ContributorsTable",
  component: ContributorsTable,
} as ComponentMeta<typeof ContributorsTable>;

const mockContributors: Contributor[] = [
  {
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    totalEarned: 2000,
    paidContributions: 3,
  },
  {
    login: "AnthonyBuisset",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    isRegistered: true,
    totalEarned: 500,
    paidContributions: 1,
  },
  {
    login: "tdelabro",
    avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
    isRegistered: false,
    totalEarned: 0,
    paidContributions: 0,
  },
];

const Template: ComponentStory<typeof ContributorsTable> = () => (
  <ContributorsTable contributors={mockContributors} isProjectLeader={false} remainingBudget={10000} />
);

export const Default = Template.bind({});
