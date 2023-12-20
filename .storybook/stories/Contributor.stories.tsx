import Contributor from "src/components/Contributor";

export default {
  title: "Contributor",
  component: Contributor,
};

const contributor = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  githubUserId: 595505,
  isRegistered: false,
};

export const Default = {
  render: () => <Contributor contributor={contributor} />,
};
