import { ProjectFilterActionType } from "src/pages/Projects/types";
import FilterDropDown, { Props } from ".";

export default {
  title: "FilterDropDown",
  component: FilterDropDown,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: [ProjectFilterActionType.SelectTechnologies, ProjectFilterActionType.SelectSponsors],
      },
    },
    width: { control: { type: "range", min: "200", max: "600" } },
  },
};

const args: Props & { width: number } = {
  defaultLabel: "All technologies",
  selectedLabel: "Technologies",
  options: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  type: ProjectFilterActionType.SelectTechnologies,
  width: 200,
  value: [],
  dispatchProjectFilter: () => {
    return;
  },
};

export const Default = {
  render: () => (
    <div style={{ width: args.width }}>
      <FilterDropDown {...args} />
    </div>
  ),
};
