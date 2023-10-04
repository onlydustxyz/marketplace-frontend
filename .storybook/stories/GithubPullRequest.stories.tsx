import { daysFromNow } from "src/utils/date";
import { GithubPullRequestWithCommitsFragment } from "src/__generated/graphql";
import GithubPullRequest, {
  Action,
  GithubPullRequestProps,
  GithubPullRequestStatus,
} from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";

const pullRequests: Record<string, GithubPullRequestWithCommitsFragment> = {
  closed: {
    id: "123",
    repoId: 123456,
    number: 541,
    status: GithubPullRequestStatus.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(2),
    closedAt: daysFromNow(1),
    mergedAt: undefined,
    author: {
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/stanislas",
      id: 123,
      user: { id: 233 },
    },
    commitsCount: { aggregate: { count: 3 } },
    userCommitsCount: { aggregate: { count: 1 } },
    contributorDetails: [
      {
        author: {
          login: "ofux",
          avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
          htmlUrl: "https://github.com/ofux",
          id: 595505,
          user: { id: 233 },
        },
      },
    ],
  },
  closedWithLongLink: {
    id: "456",
    repoId: 123456,
    number: 541,
    status: GithubPullRequestStatus.Closed,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: daysFromNow(2),
    closedAt: daysFromNow(1),
    mergedAt: undefined,
    author: {
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/stanislas",
      id: 123,
      user: { id: 233 },
    },
    commitsCount: { aggregate: { count: 3 } },
    userCommitsCount: { aggregate: { count: 1 } },
    contributorDetails: [
      {
        author: {
          login: "ofux",
          avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
          htmlUrl: "https://github.com/ofux",
          id: 595505,
          user: { id: 233 },
        },
      },
    ],
  },
  open: {
    id: "789",
    repoId: 123456,
    number: 541,
    status: GithubPullRequestStatus.Open,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(2),
    closedAt: null,
    mergedAt: null,
    author: {
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/stanislas",
      id: 123,
      user: { id: 233 },
    },
    commitsCount: { aggregate: { count: 3 } },
    userCommitsCount: { aggregate: { count: 1 } },
    contributorDetails: [
      {
        author: {
          login: "ofux",
          avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
          htmlUrl: "https://github.com/ofux",
          id: 595505,
          user: { id: 233 },
        },
      },
    ],
  },
  merged: {
    id: "000",
    repoId: 123456,
    number: 541,
    status: GithubPullRequestStatus.Merged,
    htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
    title: "Disable RPC json validation in devnet",
    createdAt: daysFromNow(2),
    mergedAt: daysFromNow(2),
    closedAt: daysFromNow(2),
    author: {
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/stanislas",
      id: 123,
      user: { id: 233 },
    },
    commitsCount: { aggregate: { count: 3 } },
    userCommitsCount: { aggregate: { count: 1 } },
    contributorDetails: [
      {
        author: {
          login: "ofux",
          avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
          htmlUrl: "https://github.com/ofux",
          id: 595505,
          user: { id: 233 },
        },
      },
    ],
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

const defaultProps: GithubPullRequestProps = { pullRequest: pullRequests.closed };
const longLinkProps: GithubPullRequestProps = { pullRequest: pullRequests.closedWithLongLink };
const openProps: GithubPullRequestProps = { pullRequest: pullRequests.open };
const mergedProps: GithubPullRequestProps = { pullRequest: pullRequests.merged };

export const Default = {
  render: (args: GithubPullRequestProps) => <GithubPullRequest {...defaultProps} {...args} />,
};

export const LongLink = {
  render: (args: GithubPullRequestProps) => <GithubPullRequest {...longLinkProps} {...args} />,
};
export const Open = {
  render: (args: GithubPullRequestProps) => <GithubPullRequest {...openProps} {...args} />,
};
export const Merged = {
  render: (args: GithubPullRequestProps) => <GithubPullRequest {...mergedProps} {...args} />,
};
