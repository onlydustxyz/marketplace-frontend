import { Meta, StoryObj } from "@storybook/react";

import { SwitchPort } from "./switch.types";
import { Switch } from "./variants/switch-default";

type Story = StoryObj<typeof Switch>;

const defaultProps: SwitchPort = {
  isActive: false,
  onChange: () => null,
  isDisabled: false,
};

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Atoms/Switch",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Switch {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Active: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch isActive={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <Switch {...defaultProps} isActive={true} />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch isDisabled />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <Switch {...defaultProps} isDisabled />
      </div>
    );
  },
};

export const ActiveDisabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch isDisabled isActive={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <Switch {...defaultProps} isDisabled isActive={true} />
      </div>
    );
  },
};

export default meta;
