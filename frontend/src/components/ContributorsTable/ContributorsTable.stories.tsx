import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Contributor } from "src/types";
import Contributors from ".";

export default {
  title: "Contributors",
  component: Contributors,
} as ComponentMeta<typeof Contributors>;

const mockContributors: Contributor[] = [
  {
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    totalEarned: 2000,
    paidContributions: 3,
    contributionsLeftToPay: 2,
  },
  {
    login: "AnthonyBuisset",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    isRegistered: false,
    totalEarned: 500,
    paidContributions: 1,
    contributionsLeftToPay: 0,
  },
  {
    login: "tdelabro",
    avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
    isRegistered: false,
    totalEarned: 0,
    paidContributions: 0,
    contributionsLeftToPay: 750,
  },
];

const Template: ComponentStory<typeof Contributors> = () => <Contributors contributors={mockContributors} />;

export const Default = Template.bind({});
