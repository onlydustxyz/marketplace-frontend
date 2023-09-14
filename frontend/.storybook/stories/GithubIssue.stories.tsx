import GithubIssue, { GithubIssue as GithubIssueType, Action, Props } from "src/components/GithubIssue";
import { daysFromNow } from "src/utils/date";
import { GithubIssueStatus, WorkItemType } from "src/__generated/graphql";


const issues: Record<string, GithubIssueType> = {
  closed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.Issue,
    status: GithubIssueStatus.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
    ignored: false,
  },
  closedWithLongLink: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.Issue,
    status: GithubIssueStatus.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
    ignored: false,
  },
  open: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.Issue,
    status: GithubIssueStatus.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(6),
    ignored: false,
  },
  completed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.Issue,
    status: GithubIssueStatus.Completed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/issues/49",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    ignored: false,
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

const defaultProps: Props = { workItem: issues.closed };
const longLinkProps: Props = { workItem: issues.closedWithLongLink };
const openProps: Props = { workItem: issues.open };
const completedProps: Props = { workItem: issues.completed };


export const Default = {
  render: (args: Props) => <GithubIssue {...defaultProps} {...args} />,
};

export const LongLink = {
  render: (args: Props) => <GithubIssue {...longLinkProps} {...args} />,
};

export const Open = {
  render: (args: Props) => <GithubIssue {...openProps} {...args} />,
};

export const Completed = {
  render: (args: Props) => <GithubIssue {...completedProps} {...args} />,
};