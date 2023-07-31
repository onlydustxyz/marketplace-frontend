import { GithubIssueStatus, GithubIssueType, GithubPullRequestStatus } from "src/types";
import GithubIssue, { Action, Props, WorkItem } from ".";
import { daysFromNow } from "src/utils/date";

const issues: Record<string, WorkItem> = {
  closed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.PullRequest,
    status: GithubPullRequestStatus.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    ignored: false,
  },
  closedWithLongLink: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.PullRequest,
    status: GithubPullRequestStatus.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    ignored: false,
  },
  prOpen: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.PullRequest,
    status: GithubPullRequestStatus.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    ignored: false,
  },
  issueOpen: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.Issue,
    status: GithubIssueStatus.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    ignored: false,
  },
  merged: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.PullRequest,
    status: GithubPullRequestStatus.Merged,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    mergedAt: daysFromNow(5),
    ignored: false,
  },
  completed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.Issue,
    status: GithubIssueStatus.Completed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    ignored: false,
  },
  cancelled: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: GithubIssueType.Issue,
    status: GithubIssueStatus.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
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

export const Default = {
  render: (args: Props) => <GithubIssue {...defaultProps} {...args} />,
};
const longLinkProps: Props = { workItem: issues.closedWithLongLink };

export const LongLink = {
  render: (args: Props) => <GithubIssue {...longLinkProps} {...args} />,
};
