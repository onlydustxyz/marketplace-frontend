import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { Avatar } from "./avatar";

type Story = StoryObj<typeof Avatar>;

const defaultProps: ComponentProps<typeof Avatar> = {};

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Design system/Avatar",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} className="h-6 w-6 text-tiny" />
        <Avatar {...defaultProps} {...args} size="sm" />
        <Avatar {...defaultProps} {...args} size="md" />
        <Avatar {...defaultProps} {...args} size="lg" />
        <Avatar {...defaultProps} {...args} className="h-20 w-20 text-large" />
      </div>
    );
  },
};

export const Boarded: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} size="md" isBoarderd />
      </div>
    );
  },
};

export const Radius: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} radius="full" />
        <Avatar {...defaultProps} {...args} radius="lg" />
        <Avatar {...defaultProps} {...args} radius="md" />
        <Avatar {...defaultProps} {...args} radius="sm" />
        <Avatar {...defaultProps} {...args} radius="none" />
      </div>
    );
  },
};

export default meta;
