import FilterDropDown, { FilterDropDownIcon, Props } from "src/components/FilterDropDown";

export default {
  title: "FilterDropDown",
  component: FilterDropDown,
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: [FilterDropDownIcon.Technology, FilterDropDownIcon.Sponsors],
      },
    },
    width: { control: { type: "range", min: "200", max: "600" } },
  },
};

const args: Props & { width: number } = {
  defaultLabel: "All technologies",
  selectedLabel: "Technologies",
  options: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  icon: FilterDropDownIcon.Technology,
  width: 200,
  value: [],
  setValue: Function.prototype(),
};

export const Default = {
  render: () => (
    <div style={{ width: args.width }}>
      <FilterDropDown {...args} />
    </div>
  ),
};
