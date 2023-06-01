import Contributor from ".";

export default {
  title: "Contributor",
  component: Contributor,
};

const contributor = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  isRegistered: true,
  id: 595505,
};

export const Default = {
  render: () => <Contributor contributor={contributor} />,
};
