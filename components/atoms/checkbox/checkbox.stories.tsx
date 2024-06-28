import { Meta, StoryObj } from "@storybook/react";

import { Checkbox, CheckboxPort } from "./index";

type Story = StoryObj<typeof Checkbox>;

const defaultProps: CheckboxPort = {};

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
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
        <Checkbox {...defaultProps} value={true} />
        <Checkbox {...defaultProps} mixed />
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
        <Checkbox {...defaultProps} color={"black"} value={true} />
        <Checkbox {...defaultProps} color={"black"} mixed />
        <Checkbox {...defaultProps} color={"black"} isDisabled />
      </div>
    );
  },
};

export default meta;
