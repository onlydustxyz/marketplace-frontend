import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import TotalEarnings from ".";

export default {
  title: "TotalEarnings",
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => <TotalEarnings {...args} />;

const args = {
  amount: 2300,
};

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
