import withContributorProfilePanelProvider from "src/test/storybook/decorators/withContributorProfilePanelProvider";
import Contributor from ".";
import { Contributor as ContributorType } from "src/types";

export default {
  title: "Contributor",
  component: Contributor,
  decorators: [withContributorProfilePanelProvider],
};

const contributor: ContributorType = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  userId: "user-1",
  githubUserId: 595505,
};

export const Default = {
  render: () => <Contributor contributor={contributor} />,
};
