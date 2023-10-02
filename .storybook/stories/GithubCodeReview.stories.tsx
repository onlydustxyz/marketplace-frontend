import { daysFromNow } from "src/utils/date";
import { GithubCodeReviewFragment } from "src/__generated/graphql";
import GithubCodeReview, { Action } from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import { ComponentProps } from "react";

const codeReviews: Record<string, GithubCodeReviewFragment> = {
  pending: {
    id: "1268051991",
    status: "PENDING",
    outcome: null,
    submittedAt: daysFromNow(6),
    reviewer: {
      id: 123,
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      user: {
        id: 123,
      },
    },
    githubPullRequest: {
      id: "1268051991",
      repoId: 123456,
      number: 541,
      status: "pending",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      title: "Disable RPC json validation in devnet",
      createdAt: daysFromNow(6),
      closedAt: null,
      mergedAt: null,
      author: {
        login: "stannislas",
        avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
        htmlUrl: "https://github.com/stanislas",
        id: 123,
        user: { id: 233 },
      },
    },
  },
  longLink: {
    id: "1268051991",
    status: "PENDING",
    outcome: null,
    submittedAt: daysFromNow(6),
    reviewer: {
      id: 123,
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      user: {
        id: 123,
      },
    },
    githubPullRequest: {
      id: "1268051991",
      repoId: 123456,
      number: 541,
      status: "pending",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      createdAt: daysFromNow(6),
      closedAt: null,
      mergedAt: null,
      author: {
        login: "stannislas",
        avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
        htmlUrl: "https://github.com/stanislas",
        id: 123,
        user: { id: 233 },
      },
    },
  },
  approved: {
    id: "1268051991",
    status: "COMPLETED",
    outcome: "APPROVED",
    submittedAt: daysFromNow(3),
    reviewer: {
      id: 123,
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      user: {
        id: 123,
      },
    },
    githubPullRequest: {
      id: "1268051991",
      repoId: 123456,
      number: 541,
      status: "pending",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      title: "Disable RPC json validation in devnet",
      createdAt: daysFromNow(6),
      closedAt: null,
      mergedAt: null,
      author: {
        login: "stannislas",
        avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
        htmlUrl: "https://github.com/stanislas",
        id: 123,
        user: { id: 233 },
      },
    },
  },
  changeRequested: {
    id: "1268051991",
    status: "COMPLETED",
    outcome: "CHANGE_REQUESTED",
    submittedAt: daysFromNow(1),
    reviewer: {
      id: 123,
      login: "stannislas",
      avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      user: {
        id: 123,
      },
    },
    githubPullRequest: {
      id: "1268051991",
      repoId: 123456,
      number: 541,
      status: "pending",
      htmlUrl: "https://github.com/sayajin-labs/kakarot/pull/541",
      title: "Disable RPC json validation in devnet",
      createdAt: daysFromNow(6),
      closedAt: null,
      mergedAt: null,
      author: {
        login: "stannislas",
        avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
        htmlUrl: "https://github.com/stanislas",
        id: 123,
        user: { id: 233 },
      },
    },
  },
};

export default {
  title: "GithubCodeReview",
  component: GithubCodeReview,
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
      options: Object.keys(codeReviews),
      mapping: codeReviews,
      control: { type: "select" },
    },
  },
};

const defaultProps: ComponentProps<typeof GithubCodeReview> = { codeReview: codeReviews.pending };
const longLink: ComponentProps<typeof GithubCodeReview> = { codeReview: codeReviews.longLink };
const pendingProps: ComponentProps<typeof GithubCodeReview> = { codeReview: codeReviews.pending };
const approvedProps: ComponentProps<typeof GithubCodeReview> = { codeReview: codeReviews.approved };
const changeRequestedProps: ComponentProps<typeof GithubCodeReview> = { codeReview: codeReviews.changeRequested };

export const Default = {
  render: (args: ComponentProps<typeof GithubCodeReview>) => <GithubCodeReview {...defaultProps} {...args} />,
};

export const LongLink = {
  render: (args: ComponentProps<typeof GithubCodeReview>) => <GithubCodeReview {...longLink} {...args} />,
};

export const Pending = {
  render: (args: ComponentProps<typeof GithubCodeReview>) => <GithubCodeReview {...pendingProps} {...args} />,
};

export const Approved = {
  render: (args: ComponentProps<typeof GithubCodeReview>) => <GithubCodeReview {...approvedProps} {...args} />,
};

export const ChangeRequested = {
  render: (args: ComponentProps<typeof GithubCodeReview>) => <GithubCodeReview {...changeRequestedProps} {...args} />,
};
