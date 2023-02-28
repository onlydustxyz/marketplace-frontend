import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor, PropsWithChildren } from "react";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Tag, { TagBorderColor, TagSize } from ".";

export default {
  title: "Tag",
  argTypes: {
    size: {
      control: {
        type: "select",
        options: [TagSize.Small, TagSize.Medium, TagSize.Large],
      },
    },
    borderColor: {
      control: {
        type: "select",
        options: [TagBorderColor.Grey, TagBorderColor.MultiColor],
      },
    },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args & PropsWithChildren>> = args => <Tag {...args} />;

const args = {
  size: TagSize.Medium,
  borderColor: TagBorderColor.Grey,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
  children: <>Processing</>,
};

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...args,
  children: (
    <>
      <ErrorWarningLine className="text-orange-500" /> Processing
    </>
  ),
};

WithIcon.parameters = {
  backgrounds: {
    default: "space",
  },
};

export const MultiColor = Template.bind({});
MultiColor.args = {
  ...args,
  borderColor: TagBorderColor.MultiColor,
  children: (
    <>
      <ErrorWarningLine className="text-pink-500" /> Payment info needed
    </>
  ),
};

MultiColor.parameters = {
  backgrounds: {
    default: "space",
  },
};
