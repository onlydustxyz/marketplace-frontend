import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import { ProjectOwnershipType } from "..";
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
  projectOwnershipType: ProjectOwnershipType.All,
  setProjectOwnershipType: () => {
    return;
  },
  isProjectLeader: false,
};

export const AllProjects = Template.bind({});
AllProjects.args = args;

export const MyProjects = Template.bind({});
MyProjects.args = {
  technologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  projectOwnershipType: ProjectOwnershipType.Mine,
  setProjectOwnershipType: () => {
    return;
  },
  isProjectLeader: true,
};
