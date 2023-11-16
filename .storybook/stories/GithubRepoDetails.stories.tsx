import { ComponentStory } from "@storybook/react";

import GithubRepoDetails from "src/pages/ProjectDetails/Overview/GithubRepoDetails/View";

export default {
  title: "GithubRepoDetails",
};

const Template: ComponentStory<typeof GithubRepoDetails> = args => <GithubRepoDetails githubRepo={githubRepo} />;
export const Default = Template.bind({});

const githubRepo = {
  id: 545531678,
  owner: "sayajin-labs",
  name: "kakarot",
  description: "ZK-EVM type 3 written in Cairo, leveraging STARK proof system.",
  stars: 308,
  forkCount: 67,
  hasIssues: true,
  htmlUrl: "",
};
