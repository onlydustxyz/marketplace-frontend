import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import Contributor from "src/components/Contributor";
import { ContributorT } from "src/types";

export default {
  title: "Contributor",
  component: Contributor,
  decorators: [withContributorProfilePanelProvider],
};

const contributor: Pick<ContributorT, "login" | "avatarUrl" | "githubUserId" | "isRegistered"> = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  githubUserId: 595505,
  isRegistered: false,
};

export const Default = {
  render: () => <Contributor contributor={contributor} />,
};
