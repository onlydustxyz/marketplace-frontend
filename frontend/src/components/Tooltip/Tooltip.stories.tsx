import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Tooltip, { TooltipDirection } from ".";

export default {
  title: "Tooltip",
  argTypes: {
    direction: {
      control: {
        type: "select",
        options: [TooltipDirection.Up, TooltipDirection.Down, TooltipDirection.Left, TooltipDirection.Right],
      },
    },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <Tooltip direction={args.direction}>{args.text}</Tooltip>
);

const args = {
  text: "Fill in your payment information to get paid",
  direction: TooltipDirection.Up,
};

export const Default = Template.bind({});
Default.args = args;
