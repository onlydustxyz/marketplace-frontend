import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Background, { BackgroundRoundedBorders } from ".";

export default {
  title: "Background",
  argTypes: {
    roundedBorders: {
      control: { type: "select", options: [BackgroundRoundedBorders.Full, BackgroundRoundedBorders.Right] },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <div style={{ height: 800 }}>
    <Background {...args} />
  </div>
);

const args = {
  roundedBorders: BackgroundRoundedBorders.Right,
};

export const Default = Template.bind({});
