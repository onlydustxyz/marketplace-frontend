import { ComponentStory, ComponentMeta } from "@storybook/react";

import GithubLink from ".";

export default {
  title: "GithubLink",
  component: GithubLink,
} as ComponentMeta<typeof GithubLink>;

const Template: ComponentStory<typeof GithubLink> = () => <GithubLink />;

export const Default = Template.bind({});
