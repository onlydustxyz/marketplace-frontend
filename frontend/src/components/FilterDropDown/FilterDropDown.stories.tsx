import { ProjectOwnershipType } from "src/pages/Projects";
import FilterDropDown, { FilterDropDownIcon } from ".";

export default {
  title: "FilterDropDown",
  component: FilterDropDown,
  argTypes: {
    icon: { control: { type: "select", options: [FilterDropDownIcon.Technology] } },
    width: { control: { type: "range", min: "200", max: "600" } },
  },
};

const args = {
  defaultLabel: "All technologies",
  selectedLabel: "Technologies",
  options: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  icon: FilterDropDownIcon.Technology,
  width: 200,
  projectFilter: { technologies: [], ownershipType: ProjectOwnershipType.All },
  setProjectFilter: () => {
    return;
  },
};

export const Default = {
  render: () => <FilterDropDown {...args} />,
};
