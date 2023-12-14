import { ComponentProps } from "react";
import { FilterSelect } from "src/components/New/Filter/FilterSelect";
import FolderLine from "src/icons/FolderLine";

export default {
  title: "FilterSelect",
  component: FilterSelect,
};

const items = [
  {
    id: 1,
    label: "Hello",
  },
  {
    id: 2,
    label: "World",
  },
  {
    id: 3,
    label: "Storybook !",
  },
];

const defaultProps: ComponentProps<typeof FilterSelect> = {
  icon: (_, className) => <FolderLine className={className} />,
  tokens: { zero: "filter.project.all", other: "filter.project" },
  items,
  selected: items[0],
  onChange: () => {},
};

export const Default = {
  render: () => (
    <div className="flex">
      <FilterSelect {...defaultProps} />
    </div>
  ),
};
