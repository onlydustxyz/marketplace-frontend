import type { Meta, StoryObj } from "@storybook/react";
import { SelectableTag } from "./selectable-tag";
import StoryState from "components/features/storybooks/stateManagement";

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
