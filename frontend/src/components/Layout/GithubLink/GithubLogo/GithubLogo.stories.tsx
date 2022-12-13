import { ComponentStory, ComponentMeta } from "@storybook/react";

import GithubLogo from ".";

export default {
  title: "GithubLogo",
  component: GithubLogo,
} as ComponentMeta<typeof GithubLogo>;

const Template: ComponentStory<typeof GithubLogo> = () => <GithubLogo />;

export const Default = Template.bind({});
