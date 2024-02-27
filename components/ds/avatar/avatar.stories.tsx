import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { AvatarLoading } from "components/ds/avatar/avatar.loading";
import { Icon } from "components/layout/icon/icon";

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

export const Skeleton: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center gap-2">
          <AvatarLoading {...args} size="xs" />
          <AvatarLoading {...args} size="s" />
          <AvatarLoading {...args} size="m" />
          <AvatarLoading {...args} size="l" />
          <AvatarLoading {...args} size="xl" />
        </div>
        <div className="flex items-center gap-2">
          <AvatarLoading {...args} size="xs" skeletonProps={{ color: "grey" }} />
          <AvatarLoading {...args} size="s" skeletonProps={{ color: "grey" }} />
          <AvatarLoading {...args} size="m" skeletonProps={{ color: "grey" }} />
          <AvatarLoading {...args} size="l" skeletonProps={{ color: "grey" }} />
          <AvatarLoading {...args} size="xl" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};

export const Labelled: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-4">
        <Avatar.Labelled {...args}>Static label</Avatar.Labelled>
        <Avatar.Labelled href={"https://example.com"} {...args}>
          With link
        </Avatar.Labelled>
        <Avatar.Labelled {...args}>
          <div className="flex items-center gap-2">
            <span>With elements</span>
            <Icon remixName="ri-error-warning-line" className="text-red-500" />
          </div>
        </Avatar.Labelled>
      </div>
    );
  },
};

export default meta;
