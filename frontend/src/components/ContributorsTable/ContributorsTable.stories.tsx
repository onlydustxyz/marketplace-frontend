import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContributorsTableFieldsFragment } from "src/__generated/graphql";
import ContributorsTable from ".";

export default {
  title: "ContributorsTable",
  component: ContributorsTable,
} as ComponentMeta<typeof ContributorsTable>;

const TEST_PROJECT_ID = "project-id";

const mockContributors: ContributorsTableFieldsFragment[] = [
  {
    id: 123456,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    user: {
      userId: "132456-13546584-16354165",
    },
    paymentRequests: [
      {
        id: "request-1",
        amountInUsd: 1500,
        reason: { work_items: ["link1", "link2"] },
        budget: {
          projectId: TEST_PROJECT_ID,
        },
      },
      {
        id: "request-2",
        amountInUsd: 500,
        reason: { work_items: ["link1"] },
        budget: {
          projectId: TEST_PROJECT_ID,
        },
      },
    ],
  },
  {
    id: 456798,
    login: "AnthonyBuisset",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    user: {
      userId: "132456-13546584-6546321",
    },
    paymentRequests: [
      {
        id: "request-1",
        amountInUsd: 500,
        reason: { work_items: ["link1"] },
        budget: {
          projectId: TEST_PROJECT_ID,
        },
      },
    ],
  },
  {
    id: 3216548,
    login: "tdelabro",
    avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
    user: null,
    paymentRequests: [],
  },
];

const Template: ComponentStory<typeof ContributorsTable> = () => (
  <ContributorsTable
    contributors={mockContributors}
    isProjectLeader={false}
    remainingBudget={10000}
    projectId={TEST_PROJECT_ID}
  />
);

export const Default = Template.bind({});
