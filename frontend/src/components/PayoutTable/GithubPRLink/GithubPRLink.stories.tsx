import { ComponentStory, ComponentMeta } from "@storybook/react";

import GithubPRLink, { LinkColor } from ".";

export default {
  title: "GithubPRLink",
  component: GithubPRLink,
} as ComponentMeta<typeof GithubPRLink>;

const Template: ComponentStory<typeof GithubPRLink> = args => <GithubPRLink {...args} />;

export const Default = Template.bind({});

Default.args = {
  link: "https://github.com/onlydustxyz/marketplace/pull/553",
  linkColor: LinkColor.Grey,
};
