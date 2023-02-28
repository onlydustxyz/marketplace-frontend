import { ComponentStory } from "@storybook/react";

import GithubRepoDetails from "./View";

export default {
  title: "GithubRepoDetails",
};

const Template: ComponentStory<typeof GithubRepoDetails> = args => <GithubRepoDetails {...args} />;
export const Default = Template.bind({});

Default.args = {
  id: 545531678,
  owner: "sayajin-labs",
  name: "kakarot",
  languages: {
    Cairo: 699257,
    Shell: 15765,
    Python: 227995,
    Makefile: 3257,
    Solidity: 404893,
    Dockerfile: 1335,
  },
  description: "ZK-EVM type 3 written in Cairo, leveraging STARK proof system.",
  stars: 308,
  forksCount: 67,
};
