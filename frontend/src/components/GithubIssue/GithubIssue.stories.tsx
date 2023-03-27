import { Status, Type } from "src/__generated/graphql";
import GithubIssue, { Action, Props } from ".";

const daysFromNow = (days: number) => new Date(Date.now() - days * 24 * 3600 * 1000);

const issues = {
  closed: {
    id: 1268051991,
    number: 541,
    type: Type.Issue,
    status: Status.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: null,
  },
  prOpen: {
    id: 1268051991,
    number: 541,
    type: Type.PullRequest,
    status: Status.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: null,
  },
  issueOpen: {
    id: 1268051991,
    number: 541,
    type: Type.Issue,
    status: Status.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: null,
  },
  merged: {
    id: 1268051991,
    number: 541,
    type: Type.PullRequest,
    status: Status.Merged,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
  },
  completed: {
    id: 1268051991,
    number: 541,
    type: Type.Issue,
    status: Status.Completed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
  },
  cancelled: {
    id: 1268051991,
    number: 541,
    type: Type.Issue,
    status: Status.Cancelled,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(5),
    mergedAt: daysFromNow(5),
  },
};

export default {
  title: "GithubIssue",
  component: GithubIssue,
  argTypes: {
    action: {
      control: { type: "select" },
      options: [undefined, Action.Add, Action.Remove],
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
