import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Badge, { BadgeIcon, BadgeSize } from ".";

export default {
  title: "Badge",
  argTypes: {
    icon: { control: { type: "select", options: [undefined, BadgeIcon.GitMerge] } },
    size: { control: { type: "select", options: [BadgeSize.Small, BadgeSize.Medium, BadgeSize.Large] } },
    value: { control: { type: "range", min: "1", max: "20" } },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => <Badge {...args} />;

const args = {
  size: BadgeSize.Medium,
  value: 3,
};

export const Default = Template.bind({});
Default.args = args;

export const WithIcon = Template.bind({});
WithIcon.args = { ...args, ...{ icon: BadgeIcon.GitMerge } };
