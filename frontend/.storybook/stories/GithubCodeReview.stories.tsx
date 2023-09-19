import { Action, GithubCodeReviewProps } from "src/components/GithubCodeReview/GithubCodeReview";
import { daysFromNow } from "src/utils/date";
import { GithubCodeReviewFragment, GithubIssueStatus } from "src/__generated/graphql";
import GithubCodeReview from "src/components/GithubCodeReview/GithubCodeReview";

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
    pullRequest: {
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
    pullRequest: {
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
    pullRequest: {
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

const defaultProps: GithubCodeReviewProps = { codeReview: codeReviews.pending };
const pendingProps: GithubCodeReviewProps = { codeReview: codeReviews.pending };
const approvedProps: GithubCodeReviewProps = { codeReview: codeReviews.approved };
const changeRequestedProps: GithubCodeReviewProps = { codeReview: codeReviews.changeRequested };

export const Default = {
  render: (args: GithubCodeReviewProps) => <GithubCodeReview {...defaultProps} {...args} />,
};

export const Pending = {
  render: (args: GithubCodeReviewProps) => <GithubCodeReview {...pendingProps} {...args} />,
};

export const Approved = {
  render: (args: GithubCodeReviewProps) => <GithubCodeReview {...approvedProps} {...args} />,
};

export const ChangeRequested = {
  render: (args: GithubCodeReviewProps) => <GithubCodeReview {...changeRequestedProps} {...args} />,
};
