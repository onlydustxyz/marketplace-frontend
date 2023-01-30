import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Tag, { TagBorderColor, TagIcon, TagIconColor, TagProps, TagSize } from ".";

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
    icon: {
      control: {
        type: "select",
        options: [TagIcon.Check, TagIcon.Time, TagIcon.Warning],
      },
    },
    iconColor: {
      control: {
        type: "select",
        options: [TagIconColor.Grey, TagIconColor.Orange, TagIconColor.Pink],
      },
    },
  },
};

const Template: ComponentStory<JSXElementConstructor<TagProps>> = args => <Tag {...args} />;

const args = {
  size: TagSize.Medium,
  label: "Processing",
  whitespaceNoWrap: false,
};

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  backgrounds: {
    default: "space",
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...args,
  icon: TagIcon.Time,
};
WithIcon.parameters = {
  backgrounds: {
    default: "space",
  },
};
