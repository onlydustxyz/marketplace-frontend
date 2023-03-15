import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Toaster from "./View";

export default {
  title: "Toaster",
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => <Toaster {...args} />;

const args = {
  message: "Payment information successfully updated",
  visible: true,
  isError: false,
};

export const Default = Template.bind({});
Default.args = args;
