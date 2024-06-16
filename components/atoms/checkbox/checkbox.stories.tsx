import { Meta, StoryObj } from "@storybook/react";

import { CheckboxCore } from "./checkbox.core";
import { TCheckboxProps } from "./checkbox.types";
import { Checkbox } from "./variants/checkbox-default";

type Story = StoryObj<typeof CheckboxCore>;

const defaultProps: TCheckboxProps = {};

const meta: Meta<typeof CheckboxCore> = {
  component: CheckboxCore,
  title: "Atoms/Checkbox",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Checkbox />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Checkbox {...defaultProps} {...args} />
      </div>
    );
  },
};

export const White: Story = {
  parameters: {
    docs: {
      source: { code: "<Checkbox />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <Checkbox {...defaultProps} />
        <Checkbox {...defaultProps} data-hover="true" />
        <Checkbox {...defaultProps} isSelected />
        <Checkbox {...defaultProps} isIndeterminate />
        <Checkbox {...defaultProps} isDisabled />
      </div>
    );
  },
};

export const Black: Story = {
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#FFFFFF" }],
    },
    docs: {
      source: { code: "<Checkbox color='black'/>" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <Checkbox {...defaultProps} color={"black"} />
        <Checkbox {...defaultProps} color={"black"} data-hover="true" />
        <Checkbox {...defaultProps} color={"black"} isSelected />
        <Checkbox {...defaultProps} color={"black"} isIndeterminate />
        <Checkbox {...defaultProps} color={"black"} isDisabled />
      </div>
    );
  },
};

export default meta;
