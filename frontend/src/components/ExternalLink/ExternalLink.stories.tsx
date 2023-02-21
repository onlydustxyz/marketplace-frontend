import { ComponentStory } from "@storybook/react";

import ExternalLink from ".";

export default {
  title: "ExternalLink",
};

const Template: ComponentStory<typeof ExternalLink> = args => <ExternalLink {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: "The link",
  url: "https://github.com/onlydustxyz/marketplace/pull/553",
};
