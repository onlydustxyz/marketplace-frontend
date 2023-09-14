import { daysFromNow } from "src/utils/date";
import { GithubPullRequestStatus, WorkItemType } from "src/__generated/graphql";
import GithubPullRequest, { GithubPullRequest as GithubPullRequestType, Action, Props } from "src/components/GithubPullRequest";


const pullRequests: Record<string, GithubPullRequestType> = {
  closed: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(6),
    mergedAt: undefined,
    ignored: false,
  },
  closedWithLongLink: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: daysFromNow(6),
    closedAt: daysFromNow(6),
    mergedAt: undefined,
    ignored: false,
  },
  open: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    ignored: false,
  },
  merged: {
    id: "1268051991",
    repoId: 123456,
    number: 541,
    type: WorkItemType.PullRequest,
    status: GithubPullRequestStatus.Merged,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(6),
    mergedAt: daysFromNow(5),
    ignored: false,
  },
};

export default {
  title: "GithubPullRequest",
  component: GithubPullRequest,
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
      options: Object.keys(pullRequests),
      mapping: pullRequests,
      control: { type: "select" },
    },
  },
};

const defaultProps: Props = { workItem: pullRequests.closed };
const longLinkProps: Props = { workItem: pullRequests.closedWithLongLink };
const openProps: Props = { workItem: pullRequests.open };
const mergedProps: Props = { workItem: pullRequests.merged };


export const Default = {
  render: (args: Props) => <GithubPullRequest {...defaultProps} {...args} />,
};

export const LongLink = {
  render: (args: Props) => <GithubPullRequest {...longLinkProps} {...args} />,
};
export const Open = {
  render: (args: Props) => <GithubPullRequest {...openProps} {...args} />,
};
export const Merged = {
  render: (args: Props) => <GithubPullRequest {...mergedProps} {...args} />,
};