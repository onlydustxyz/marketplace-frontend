import { Meta, StoryObj } from "@storybook/react";

import { CardIssuePort } from "./card-issue.types";
import { CardIssue } from "./variants/card-issue-default";

type Story = StoryObj<typeof CardIssue>;

const defaultProps: CardIssuePort<"div"> = {
  githubLink: "https://github.com",
  createdAt: new Date("Fri, 11 Jul 2024 09:17:46 GMT"),
  title: "Fix UI Bug on Transaction History Page",
  tags: [{ children: "React" }, { children: "OD hack" }, { children: "GFI" }],
  applicantsTotalCount: 10,
  applyActionProps: {
    children: "Apply",
  },
  assignee: {
    avatar: {},
    name: "GithubLogin",
  },
  viewActionProps: {
    children: "View application",
  },
  tokens: {
    githubLink: "View on Github",
    createdBy: "By",
    applicantsCount: "applicants",
  },
  repo: {
    name: "Repo-Protostar",
  },
  createdBy: {
    name: "GithubLogin",
    avatar: {},
  },
  applicants: [...Array(10).keys()].map(() => ({
    name: "Applicant",
    avatarUrl: undefined,
  })),
};

const meta: Meta<typeof CardIssue> = {
  component: CardIssue,
  title: "Molecules/Cards/CardIssue",
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
      source: { code: "<CardIssue />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[544px] items-center gap-2">
        <CardIssue {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Open: Story = {
  parameters: {
    docs: {
      source: { code: "<CardIssue status='open' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[544px] items-center gap-2">
        <CardIssue {...defaultProps} {...args} status={"open"} />
      </div>
    );
  },
};

export const Applied: Story = {
  parameters: {
    docs: {
      source: { code: "<CardIssue status='applied' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[544px] items-center gap-2">
        <CardIssue {...defaultProps} {...args} status={"applied"} />
      </div>
    );
  },
};

export const Assigned: Story = {
  parameters: {
    docs: {
      source: { code: "<CardIssue status='assigned' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[544px] items-center gap-2">
        <CardIssue {...defaultProps} {...args} status={"assigned"} />
      </div>
    );
  },
};

export default meta;
