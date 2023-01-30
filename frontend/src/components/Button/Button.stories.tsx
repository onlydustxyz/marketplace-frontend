import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Button, { ButtonSize, ButtonType } from ".";

export default {
  title: "Button",
  argTypes: {
    size: {
      control: {
        type: "select",
        options: [ButtonSize.Medium, ButtonSize.Large],
      },
    },
    type: {
      control: {
        type: "select",
        options: [ButtonType.Primary, ButtonType.Secondary],
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <Button {...args}>
    <div>{args.text}</div>
  </Button>
);

export const Default = Template.bind({});

const args = {
  text: "Complete payment information",
  disabled: false,
};

Default.args = args;
