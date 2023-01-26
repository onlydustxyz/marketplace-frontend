import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import FilterDropDown, { FilterDropDownIcon } from ".";

export default {
  title: "FilterDropDown",
  argTypes: {
    icon: { control: { type: "select", options: [FilterDropDownIcon.Technology] } },
    width: { control: { type: "range", min: "200", max: "600" } },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <div style={{ width: args.width }}>
    <FilterDropDown {...args} />
  </div>
);

const args = {
  defaultLabel: "All technologies",
  selectedLabel: "Technologies",
  options: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  icon: FilterDropDownIcon.Technology,
  width: 200,
};

export const Default = Template.bind({});
Default.args = args;
