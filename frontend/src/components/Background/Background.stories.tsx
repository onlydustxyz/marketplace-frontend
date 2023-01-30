import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Background from ".";

export default {
  title: "Background",
  parameters: {
    layout: "fullscreen",
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof Background>> = () => (
  <div style={{ height: 800 }}>
    <Background />
  </div>
);

export const Default = Template.bind({});
