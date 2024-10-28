import { Meta, StoryObj } from "@storybook/react";
import process from "process";

import { HackathonCardLoading } from "components/features/hackathons/hackathon-card/hackathon-card.loading";
import { HackathonCardMini } from "components/features/hackathons/hackathon-card/hackathon-card.mini";

import { HackathonCard } from "./hackathon-card";
import { HackathonCardMiniPort, HackathonCardPort } from "./hackathon-card.types";

type Story = StoryObj<typeof HackathonCard>;

const defaultPort: HackathonCardPort<"div"> = {
  title: "Hackathon Example",
  slug: "example",
  backgroundImage: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cover-1.png`,
  adaptMapStatusToTag: () => ({
    tagText: "Status tags",
  }),
  location: "Paris",
  upperTitle: "Hackathon",
  buttonLabel: "Discover",
  dates: {
    startDate: "2021-09-01",
    endDate: "2021-09-02",
    startTime: "10:00",
  },
  status: "open",
  projects: [
    {
      id: "1",
      name: "Project 1",
      slug: "project-1",
    },
    {
      id: "2",
      name: "Project 2",
      slug: "project-2",
    },
  ],
  classNames: {
    base: "w-full",
  },
  subscriberCount: 240,
  openIssueCount: 23,
  issueCount: 147,
};

const closedPort: HackathonCardPort<"div"> = {
  ...defaultPort,
  title: "Hackathon Closed",
  status: "closed",
  hasLayer: true,
};

const noButtonPort: HackathonCardPort<"div"> = {
  ...defaultPort,
  title: "Hackathon Without Button",
  slug: undefined,
};

const multipleProjectsPort: HackathonCardPort<"div"> = {
  ...defaultPort,
  title: "Hackathon with Multiple Projects",
  projects: [
    {
      id: "1",
      name: "Project 1",
      slug: "project-1",
    },
    {
      id: "2",
      name: "Project 2",
      slug: "project-2",
    },
    {
      id: "3",
      name: "Project 3",
      slug: "project-3",
    },
    {
      id: "4",
      name: "Project 4",
      slug: "project-4",
    },
    {
      id: "5",
      name: "Project 5",
      slug: "project-5",
    },
  ],
};

const subscriberAndIssueCountPort: HackathonCardPort<"div"> = {
  ...defaultPort,
  title: "Hackathon with Subscriber and Issue Count",
  subscriberCount: 120,
  issueCount: 50,
  openIssueCount: 10,
};

const miniPort: HackathonCardMiniPort<"article"> = {
  title: "Hackathon Example",
  slug: "example",
  backgroundImage: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cover-1.png`,
  upperTitle: "Hackathon",
  classNames: {
    base: "w-full",
  },
};

const meta: Meta<typeof HackathonCard> = {
  component: HackathonCard,
  title: "Local/HackathonCard",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCard />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCard {...defaultPort} {...args} />
      </div>
    );
  },
};

export const SubscriberAndIssueCount: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCard subscriberCount={120} issueCount={50} openIssueCount={10} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCard {...subscriberAndIssueCountPort} {...args} />
      </div>
    );
  },
};

export const ClosedWithLayer: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCard status='closed' hasLayer />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCard {...closedPort} {...args} />
      </div>
    );
  },
};

export const WithoutButton: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCard slug={undefined} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCard {...noButtonPort} {...args} />
      </div>
    );
  },
};

export const MultipleProjects: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCard projects={projects} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCard {...multipleProjectsPort} {...args} />
      </div>
    );
  },
};

export const Mini: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCardMini />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCardMini {...miniPort} {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<HackathonCardLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCardLoading
          classNames={{
            base: "w-full",
          }}
        />
      </div>
    );
  },
};

export default meta;
