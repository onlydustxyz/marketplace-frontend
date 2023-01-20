import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import FormToggle from "./View";

export default {
  title: "FormToggle",
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <FormToggle {...props} checked={args.checked} />
);

const props = {
  label: "Label",
};

const args = {
  checked: false,
};

export const Default = Template.bind({});
Default.args = args;
