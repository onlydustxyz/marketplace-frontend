import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import FilterPanel from "./View";

export default {
  title: "FilterPanel",
  argTypes: {},
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <div style={{ width: 400 }}>
    <FilterPanel {...args} />
  </div>
);

const args = {
  technologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
};

export const Default = Template.bind({});
Default.args = args;
