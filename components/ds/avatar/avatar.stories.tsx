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
        <Avatar {...defaultProps} {...args} size="xs" />
        <Avatar {...defaultProps} {...args} size="s" />
        <Avatar {...defaultProps} {...args} size="m" />
        <Avatar {...defaultProps} {...args} size="l" />
        <Avatar {...defaultProps} {...args} size="xl" />
      </div>
    );
  },
};

export const Shape: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} shape="square" />
        <Avatar {...defaultProps} {...args} shape="circle" />
      </div>
    );
  },
};

export const Loading: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} isLoading />
      </div>
    );
  },
};

export default meta;
