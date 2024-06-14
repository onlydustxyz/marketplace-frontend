import { Meta, StoryObj } from "@storybook/react";

import { AvatarCore } from "./avatar.core";
import { TAvatarProps } from "./avatar.types";
import { Avatar } from "./variants/avatar-default";

type Story = StoryObj<typeof AvatarCore>;

const defaultProps: TAvatarProps = {
  name: "AB",
};

const meta: Meta<typeof AvatarCore> = {
  component: AvatarCore,
  title: "Atoms/Avatar",
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
      source: { code: "<Avatar />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} />
        <Avatar {...defaultProps} {...args} src={"https://avatars.githubusercontent.com/u/17259618?v=4"} />
        <Avatar {...defaultProps} {...args} src={"https://images.unsplash.com/broken"} />
        <Avatar {...defaultProps} {...args} src={"https://images.unsplash.com/broken"} name={undefined} />
      </div>
    );
  },
};

export const Core: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <AvatarCore {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
