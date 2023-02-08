import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Tooltip, { TooltipPosition } from ".";

export default {
  title: "Tooltip",
  argTypes: {
    position: {
      control: {
        type: "select",
        options: [TooltipPosition.Bottom, TooltipPosition.Top, TooltipPosition.Left, TooltipPosition.Right],
      },
    },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <div className="w-96 h-96 flex items-center justify-center">
    <span id="anchor-id">Hover me!</span>
    <Tooltip anchorId="anchor-id" position={args.position}>
      {args.text}
    </Tooltip>
  </div>
);

const args = {
  text: "Fill in your payment information to get paid",
  position: TooltipPosition.Bottom,
};

export const Default = Template.bind({});
Default.args = args;
