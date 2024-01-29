import type { Meta, StoryObj } from "@storybook/react";
import { SelectableTag } from "./selectable-tag";
import StoryState from "components/features/storybooks/stateManagement";
import { SelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item";
import { Icon } from "components/layout/icon/icon";

const meta: Meta<typeof SelectableTag> = {
  component: SelectableTag,
  title: "Design system/Form/SelectableTag",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectableTag>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <SelectableTagItem value="value1" checkboxProps={{ onChange: () => null }} active={true}>
            Active
          </SelectableTagItem>
          <SelectableTagItem
            value="value1"
            checkboxProps={{ onChange: () => null }}
            active={true}
            icon={props => <Icon remixName="ri-seedling-line" {...props} />}
          >
            Active with icon
          </SelectableTagItem>
        </div>
        <div className="flex flex-row items-center gap-2">
          <SelectableTagItem value="value1" checkboxProps={{ onChange: () => null }}>
            Default
          </SelectableTagItem>
          <SelectableTagItem
            value="value1"
            checkboxProps={{ onChange: () => null }}
            icon={props => <Icon remixName="ri-seedling-line" {...props} />}
          >
            Default with icon
          </SelectableTagItem>
        </div>
        <div className="flex flex-row items-center gap-2">
          <SelectableTagItem value="value1" checkboxProps={{ onChange: () => null }} disabled={true}>
            disabled
          </SelectableTagItem>
          <SelectableTagItem
            value="value1"
            checkboxProps={{ onChange: () => null }}
            disabled={true}
            icon={props => <Icon remixName="ri-seedling-line" {...props} />}
          >
            disabled with icon
          </SelectableTagItem>
        </div>
      </div>
    );
  },
};
export const Single: Story = {
  render: () => {
    return (
      <StoryState initial="value1">
        {(state, setState) => (
          <SelectableTag
            mode="single"
            value={state}
            onChange={v => setState(v)}
            options={[
              {
                value: "value1",
                children: "Value 1",
              },
              {
                value: "value2",
                children: "Value 2",
              },
            ]}
          />
        )}
      </StoryState>
    );
  },
};
export const Multiple: Story = {
  render: () => {
    return (
      <StoryState initial={["value1"]}>
        {(state, setState) => (
          <SelectableTag
            mode="multiple"
            value={state}
            onChange={v => setState(v)}
            options={[
              {
                value: "value1",
                children: "Value 1",
              },
              {
                value: "value2",
                children: "Value 2",
              },
              {
                value: "value3",
                children: "Value 3",
              },
              {
                value: "value4",
                children: "Value 4",
              },
            ]}
          />
        )}
      </StoryState>
    );
  },
};
