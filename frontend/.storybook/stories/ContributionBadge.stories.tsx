import { ComponentProps } from "react";
import { UserIdentityDocument } from "src/__generated/graphql";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { GithubContributionType, GithubPullRequestStatus } from "src/types";
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
  title: "ContributionBadge",
  component: ContributionBadge,
  decorators: [withMockedProvider(mocks), withAuthProvider({ userId: USER_ID }), withContributorProfilePanelProvider],
};

const defaultProps: ComponentProps<typeof ContributionBadge> = {
  id: "123",
  number: 123,
  status: GithubPullRequestStatus.Open,
  type: GithubContributionType.PullRequest,
  title: "Contribution Badge",
  url: "",
  author: {
    avatarUrl: "#",
    login: "test-account",
    id: 123,
  },
};

export const Default = {
  render: (args: typeof ContributionBadge) => <ContributionBadge {...defaultProps} {...args} />,
};
