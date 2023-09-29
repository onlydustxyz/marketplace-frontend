import { ComponentProps } from "react";
import { withRouter } from "storybook-addon-react-router-v6";

import { GithubPullRequestStatus, UserIdentityDocument } from "src/__generated/graphql";
import { Contribution } from "src/components/Contribution/Contribution";
import { GithubContributionType } from "src/types";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withMockedProvider from "../decorators/withMockedProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

const mocks = [
  {
    request: {
      query: UserIdentityDocument,
      variables: { userId: USER_ID },
    },
    result: {
      data: {
        userPayoutInfo: [
          {
            userId: USER_ID,
            lastname: "Bar",
            firstname: "Foo",
          },
        ],
      },
    },
  },
];

export default {
  title: "Contribution",
  component: Contribution,
  argTypes: {
    isMobile: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    withRouter,
    withMockedProvider(mocks),
    withAuthProvider({ userId: USER_ID }),
    withContributorProfilePanelProvider,
  ],
};

const mockContribution = {
  id: "123",
  type: GithubContributionType.PullRequest,
  githubIssue: null,
  githubCodeReview: null,
  githubPullRequest: {
    title: "Example Pull Request",
    htmlUrl: "https://github.com/example/repo/pull/123",
    number: 123,
    status: GithubPullRequestStatus.Open,
    author: {
      login: "example-user",
      avatarUrl: "https://avatars.githubusercontent.com/u/12345678?v=4",
    },
    codeReviews: [],
  },
  rewardItems: [{ paymentId: "123" }],
} as any;

const defaultProps: ComponentProps<typeof Contribution> = {
  contribution: mockContribution,
  isMobile: false,
};

export const Default = {
  render: (args: typeof Contribution) => <Contribution {...defaultProps} {...args} />,
};
