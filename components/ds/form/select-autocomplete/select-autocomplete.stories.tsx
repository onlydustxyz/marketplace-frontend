import type { Meta, StoryObj } from "@storybook/react";

import FolderLine from "src/icons/FolderLine";

import { SelectAutocomplete } from "./select-autocomplete";

const meta: Meta<typeof SelectAutocomplete> = {
  component: SelectAutocomplete,
  title: "Design system/Form/SelectAutocomplete",
  tags: ["autodocs"],
  parameters: {
    height: 500,
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
    docs: { iframeHeight: 600 },
  },
};

export default meta;
type Story = StoryObj<typeof SelectAutocomplete>;

export const Default: Story = {
  render: () => {
    return (
      <div className="h-80 w-80">
        <SelectAutocomplete
          type="square"
          icon={({ className }) => <FolderLine className={className} />}
          tokens={{ zero: "filter.project.all", other: "filter.project", empty: "filter.project.empty" }}
          items={[
            { value: "value1", label: "label1", id: "value1", image: null },
            { value: "value2", label: "label2", id: "value2", image: null },
          ]}
          multiple
          selected={[{ value: "value1", label: "label1", id: "value1", image: null }]}
          onChange={items => console.log("onChange", items)}
          disabled={false}
        />
      </div>
    );
  },
};
export const AvatarCircle: Story = {
  render: () => {
    return (
      <div className="h-80 w-80">
        <SelectAutocomplete
          type="circle"
          icon={({ className }) => <FolderLine className={className} />}
          tokens={{ zero: "filter.project.all", other: "filter.project", empty: "filter.project.empty" }}
          items={[
            { value: "value1", label: "label1", id: "value1", image: null },
            { value: "value2", label: "label2", id: "value2", image: null },
          ]}
          multiple
          selected={[{ value: "value1", label: "label1", id: "value1", image: null }]}
          onChange={items => console.log("onChange", items)}
          disabled={false}
        />
      </div>
    );
  },
};

export const NoAvatar: Story = {
  render: () => {
    return (
      <div className="h-80 w-80">
        <SelectAutocomplete
          type="circle"
          icon={({ className }) => <FolderLine className={className} />}
          tokens={{ zero: "filter.project.all", other: "filter.project", empty: "filter.project.empty" }}
          items={[
            { value: "value1", label: "label1", id: "value1" },
            { value: "value2", label: "label2", id: "value2" },
          ]}
          multiple
          selected={[{ value: "value1", label: "label1", id: "value1" }]}
          onChange={items => console.log("onChange", items)}
          disabled={false}
        />
      </div>
    );
  },
};
