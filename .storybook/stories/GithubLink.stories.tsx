import { ComponentStory, ComponentMeta } from "@storybook/react";

import GithubLink from "src/App/Layout/Header/GithubLink";

export default {
  title: "GithubLink",
  component: GithubLink,
} as ComponentMeta<typeof GithubLink>;

const Template: ComponentStory<typeof GithubLink> = () => <GithubLink />;

export const Default = Template.bind({});
