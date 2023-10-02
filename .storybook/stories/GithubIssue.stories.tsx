import GithubIssue, { Action } from "src/components/GithubCard/GithubIssue/GithubIssue";
import { daysFromNow } from "src/utils/date";
import { GithubIssueFragment, GithubIssueStatus } from "src/__generated/graphql";
import { ComponentProps } from "react";

const issues: Record<string, GithubIssueFragment> = {
  closed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    status: GithubIssueStatus.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    assigneeIds: [],
    commentsCount: null,
  },
  closedWithLongLink: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    status: GithubIssueStatus.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    assigneeIds: [],
    commentsCount: null,
  },
  open: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    status: GithubIssueStatus.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(6),
    assigneeIds: [],
    commentsCount: null,
  },
  completed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    status: GithubIssueStatus.Completed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    assigneeIds: [],
    commentsCount: null,
  },
};

export default {
  title: "GithubIssue",
  component: GithubIssue,
  argTypes: {
    action: {
      control: { type: "select" },
      options: [undefined, Action.Add, Action.Remove, Action.Ignore, Action.UnIgnore],
    },
    secondaryAction: {
      control: { type: "select" },
      options: [undefined, Action.Add, Action.Remove, Action.Ignore, Action.UnIgnore],
    },
    workItem: {
      options: Object.keys(issues),
      mapping: issues,
      control: { type: "select" },
    },
  },
};

const defaultProps: ComponentProps<typeof GithubIssue> = { issue: issues.closed };
const longLinkProps: ComponentProps<typeof GithubIssue> = { issue: issues.closedWithLongLink };
const openProps: ComponentProps<typeof GithubIssue> = { issue: issues.open };
const completedProps: ComponentProps<typeof GithubIssue> = { issue: issues.completed };

export const Default = {
  render: (args: ComponentProps<typeof GithubIssue>) => <GithubIssue {...defaultProps} {...args} />,
};

export const LongLink = {
  render: (args: ComponentProps<typeof GithubIssue>) => <GithubIssue {...longLinkProps} {...args} />,
};

export const Open = {
  render: (args: ComponentProps<typeof GithubIssue>) => <GithubIssue {...openProps} {...args} />,
};

export const Completed = {
  render: (args: ComponentProps<typeof GithubIssue>) => <GithubIssue {...completedProps} {...args} />,
};
