import { useState } from "react";

import { FilterCombobox } from "src/components/New/Filter/FilterCombobox";
import FolderLine from "src/icons/FolderLine";

export default {
  title: "FilterCombobox",
  component: FilterCombobox,
};

const items: { id: number; label: string }[] = [
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

export const Default = {
  render: () => (
    <div className="flex">
      <FilterCombobox<(typeof items)[number]>
        items={items}
        selected={[items[0]]}
        onChange={() => {}}
        queryState={useState<string>()}
        renderIcon={props => <FolderLine {...props} />}
        renderItem={({ item }) => {
          return <>{item.label}</>;
        }}
        uniqueKey="id"
      />
    </div>
  ),
};
