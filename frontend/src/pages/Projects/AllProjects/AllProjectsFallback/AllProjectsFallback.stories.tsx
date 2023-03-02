import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import AllProjectsFallback from ".";

export default {
  title: "AllProjectsFallback",
};

const Template: ComponentStory<JSXElementConstructor<typeof AllProjectsFallback>> = () => <AllProjectsFallback />;

export const Default = Template.bind({});

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
