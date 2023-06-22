import { ComponentStory } from "@storybook/react";
import HeaderColorButton from ".";
import { HeaderColor } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";

export default {
  title: "HeaderColorButton",
  component: HeaderColorButton,
  argTypes: {
    color: {
      options: [HeaderColor.Cyan, HeaderColor.Magenta, HeaderColor.Yellow, HeaderColor.Blue],
    },
    active: {
      control: { type: "boolean" },
    },
  },
};

const Template: ComponentStory<typeof HeaderColorButton> = args => <HeaderColorButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  active: true,
  color: HeaderColor.Cyan,
};
