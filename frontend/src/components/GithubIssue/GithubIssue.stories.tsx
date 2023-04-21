import { Status, Type } from "src/__generated/graphql";
import GithubIssue, { Action, Props, WorkItem } from ".";
import { daysFromNow } from "src/utils/date";

const issues: Record<string, WorkItem> = {
  closed: {
    id: 1268051991,
    repoId: 123456,
    number: 541,
    type: Type.Issue,
    status: Status.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: null,
    ignoredForProjects: [],
  },
  prOpen: {
    id: 1268051991,
    repoId: 123456,
    number: 541,
    type: Type.PullRequest,
    status: Status.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: null,
    ignoredForProjects: [],
  },
  issueOpen: {
    id: 1268051991,
    repoId: 123456,
    number: 541,
    type: Type.Issue,
    status: Status.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: null,
    ignoredForProjects: [],
  },
  merged: {
    id: 1268051991,
    repoId: 123456,
    number: 541,
    type: Type.PullRequest,
    status: Status.Merged,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
    ignoredForProjects: [],
  },
  completed: {
    id: 1268051991,
    repoId: 123456,
    number: 541,
    type: Type.Issue,
    status: Status.Completed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
    ignoredForProjects: [],
  },
  cancelled: {
    id: 1268051991,
    repoId: 123456,
    number: 541,
    type: Type.Issue,
    status: Status.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
    ignoredForProjects: [],
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

const props: Props = { workItem: issues.closed };

export const Default = {
  render: (args: Props) => <GithubIssue {...props} {...args} />,
};
